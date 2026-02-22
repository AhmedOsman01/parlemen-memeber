export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { parseBasicAuthHeader } from "@/lib/basicAuth";
import { connectToDatabase } from '@/lib/mongodb';

// POST /api/admin/token
// Accepts JSON { username, password, ttlSec } and returns { token, expiresAt }
// Validates credentials against `admins` collection (PBKDF2) or falls back to env BASIC_AUTH_USER/PASS.
// Requires ADMIN_JWT_SECRET to be set to sign tokens.

function verifyPbkdf2(password, stored) {
  const crypto = require('crypto');
  try {
    const hash = crypto.pbkdf2Sync(password, stored.salt, stored.iterations, stored.keylen, stored.digest).toString('hex');
    return hash === stored.hash;
  } catch (e) {
    return false;
  }
}

export async function POST(req) {
  try {
    if (!process.env.ADMIN_JWT_SECRET) {
      return NextResponse.json({ error: "ADMIN_JWT_SECRET not configured" }, { status: 500 });
    }

    const body = await req.json().catch(() => ({}));
    const { username, password, ttlSec } = body;

    // Support Basic Auth header as well
    let creds = null;
    const authHeader = req.headers.get && req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Basic ')) {
      creds = parseBasicAuthHeader(authHeader);
    } else if (username && password) {
      creds = { user: username, pass: password };
    }

    if (!creds) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    let validUser = false;
    let subject = creds.user;

    // Try DB lookup first
    try {
      const { db } = await connectToDatabase();
      const admin = await db.collection('admins').findOne({ username: creds.user });
      if (admin && admin.password && admin.password.algo === 'pbkdf2') {
        if (verifyPbkdf2(creds.pass, admin.password)) {
          validUser = true;
          subject = admin.username;
        }
      }
    } catch (e) {
      // ignore DB errors and fallback to env
      console.warn('admin token: db lookup failed', e.message || e);
    }

    // Fallback to env vars if DB didn't validate
    if (!validUser) {
      const expectedUser = process.env.BASIC_AUTH_USER;
      const expectedPass = process.env.BASIC_AUTH_PASS;
      if (!expectedUser || !expectedPass) {
        return NextResponse.json({ error: 'Basic auth not configured on server' }, { status: 500 });
      }
      if (creds.user !== expectedUser || creds.pass !== expectedPass) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }
      validUser = true;
      subject = creds.user;
    }

    if (!validUser) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Issue JWT
    let jwt;
    try {
      jwt = require('jsonwebtoken');
    } catch (e) {
      return NextResponse.json({ error: 'jsonwebtoken package not installed' }, { status: 500 });
    }

    const ttl = Number(ttlSec) || Number(process.env.ADMIN_JWT_TTL_SEC) || 3600; // default 1h
    const expiresIn = `${ttl}s`;
    const { randomUUID } = require('crypto');
    const jti = randomUUID();
    const payload = { sub: subject, role: 'admin', jti };
    const token = jwt.sign(payload, process.env.ADMIN_JWT_SECRET, { expiresIn });
    const expiresAt = new Date(Date.now() + ttl * 1000).toISOString();

    const csrf = randomUUID();
    // Also return token and csrf in body to help client-side testing (cookie still set HttpOnly)
    const res = NextResponse.json({ expiresAt, token, csrf });
    const isProd = process.env.NODE_ENV === 'production';
    res.cookies.set('admin_jwt', token, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: ttl,
    });
    res.cookies.set('admin_csrf', csrf, {
      httpOnly: false,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: ttl,
    });

    // Optionally store active session in Redis (allowlist) if Redis configured
    try {
      const { getRedisClient } = require('@/lib/rateLimiter');
      const client = await getRedisClient();
      if (client) {
        await client.set(`active:${jti}`, '1', { EX: ttl });
      }
    } catch (e) {
      // ignore redis errors
    }

    return res;
  } catch (err) {
    console.error('/api/admin/token error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
