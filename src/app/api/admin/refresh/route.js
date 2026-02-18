import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

function parseCookie(header) {
  if (!header) return null;
  const parts = header.split(';').map(p => p.trim());
  for (const p of parts) {
    if (p.startsWith('admin_jwt=')) return p.slice('admin_jwt='.length);
  }
  return null;
}

export async function POST(req) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const token = parseCookie(cookieHeader);
    if (!token) return NextResponse.json({ error: 'No token' }, { status: 401 });

    let jwt;
    try {
      jwt = require('jsonwebtoken');
    } catch (e) {
      return NextResponse.json({ error: 'jsonwebtoken not available' }, { status: 500 });
    }

    if (!process.env.ADMIN_JWT_SECRET) {
      return NextResponse.json({ error: 'ADMIN_JWT_SECRET not configured' }, { status: 500 });
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const ttl = Number(process.env.ADMIN_JWT_TTL_SEC) || 3600;
    const newToken = jwt.sign({ sub: payload.sub, role: payload.role || 'admin' }, process.env.ADMIN_JWT_SECRET, { expiresIn: `${ttl}s` });
    const res = NextResponse.json({ success: true, expiresAt: new Date(Date.now() + ttl * 1000).toISOString() });
    const isProd = process.env.NODE_ENV === 'production';
    res.cookies.set('admin_jwt', newToken, { httpOnly: true, secure: isProd, sameSite: 'lax', path: '/', maxAge: ttl });
    return res;
  } catch (err) {
    console.error('/api/admin/refresh error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
