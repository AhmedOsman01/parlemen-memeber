import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });
  // clear cookie by setting maxAge=0
  res.cookies.set('admin_jwt', '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 });
  return res;
}
