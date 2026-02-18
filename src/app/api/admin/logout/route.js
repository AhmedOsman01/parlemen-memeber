import { NextResponse } from "next/server";
import { getRedisClient } from "@/lib/rateLimiter";

function parseCookieValue(cookieHeader, name) {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(';').map(p => p.trim());
  for (const p of parts) {
    if (p.startsWith(name + '=')) return p.slice(name.length + 1);
  }
  return null;
}

export async function POST(req) {
  try {
    // CSRF double-submit: require header x-csrf to match admin_csrf cookie value
    const csrfHeader = req.headers.get('x-csrf') || '';
    const cookieHeader = req.headers.get('cookie') || '';
    const csrfCookie = parseCookieValue(cookieHeader, 'admin_csrf');
    if (!csrfCookie || csrfHeader !== csrfCookie) {
      return NextResponse.json({ error: 'CSRF validation failed' }, { status: 403 });
    }

    const token = parseCookieValue(cookieHeader, 'admin_jwt');
    if (!token) {
      const res = NextResponse.json({ success: true });
      res.cookies.set('admin_jwt', '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 });
      res.cookies.set('admin_csrf', '', { httpOnly: false, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 });
      return res;
    }

    let jwt;
    try {
      jwt = require('jsonwebtoken');
    } catch (e) {
      // fallback: just clear cookie
      const res = NextResponse.json({ success: true });
      res.cookies.set('admin_jwt', '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 });
      res.cookies.set('admin_csrf', '', { httpOnly: false, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 });
      return res;
    }

    let payload = null;
    try {
      payload = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    } catch (e) {
      // token invalid: still clear cookie
      const res = NextResponse.json({ success: true });
      res.cookies.set('admin_jwt', '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 });
      res.cookies.set('admin_csrf', '', { httpOnly: false, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 });
      return res;
    }

    // Revoke token via Redis by storing revoked:{jti} with TTL = remaining seconds
    try {
      const client = await getRedisClient();
      if (client && payload && payload.jti && payload.exp) {
        const now = Math.floor(Date.now() / 1000);
        const ttl = Math.max(1, payload.exp - now);
        await client.set(`revoked:${payload.jti}`, '1', { EX: ttl });
      }
    } catch (e) {
      // ignore redis errors
    }

    const res = NextResponse.json({ success: true });
    res.cookies.set('admin_jwt', '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 });
    res.cookies.set('admin_csrf', '', { httpOnly: false, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 });
    return res;
  } catch (err) {
    console.error('/api/admin/logout error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
