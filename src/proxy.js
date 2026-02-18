// Minimal proxy stub
// Next.js expects a function export for `proxy` when a proxy file exists.
// We export a no-op proxy that simply forwards the request (NextResponse.next()).
import { NextResponse } from 'next/server';

export function proxy(request) {
	// No-op: let Next.js handle the request normally. Implement custom logic here
	// if you need to intercept requests (headers, rewrites, auth, etc.).
	return NextResponse.next();
}

export const config = { matcher: [] };
