export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { parseBasicAuthHeader } from "@/lib/basicAuth";

// POST /api/admin/token
// Accepts JSON { username, password, ttlSec } and returns { token, expiresAt }
// Requires process.env.BASIC_AUTH_USER and BASIC_AUTH_PASS to be set for credential check.
// Also requires ADMIN_JWT_SECRET to be set to sign tokens.

export async function POST(req) {
  try {
    if (!process.env.ADMIN_JWT_SECRET) {
      return NextResponse.json({ error: "ADMIN_JWT_SECRET not configured" }, { status: 500 });
    }

    const body = await req.json().catch(() => ({}));
    const { username, password, ttlSec } = body;

    // Support Basic Auth header as well
    let creds = null;
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Basic ')) {
      creds = parseBasicAuthHeader(authHeader);
    } else if (username && password) {
      creds = { user: username, pass: password };
    }

    if (!creds) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    const expectedUser = process.env.BASIC_AUTH_USER;
    const expectedPass = process.env.BASIC_AUTH_PASS;
    if (!expectedUser || !expectedPass) {
      return NextResponse.json({ error: 'Basic auth not configured on server' }, { status: 500 });
    }

    if (creds.user !== expectedUser || creds.pass !== expectedPass) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Issue JWT
    let jwt;
    try {
      // dynamic require so project doesn't hard-fail when package missing during development
      jwt = require('jsonwebtoken');
    } catch (e) {
      return NextResponse.json({ error: 'jsonwebtoken package not installed' }, { status: 500 });
    }

    const ttl = Number(ttlSec) || Number(process.env.ADMIN_JWT_TTL_SEC) || 3600; // default 1h
    const expiresIn = `${ttl}s`;
    const payload = { sub: creds.user, role: 'admin' };
    const token = jwt.sign(payload, process.env.ADMIN_JWT_SECRET, { expiresIn });
    const expiresAt = new Date(Date.now() + ttl * 1000).toISOString();
    return NextResponse.json({ token, expiresAt });
  } catch (err) {
    console.error('/api/admin/token error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
