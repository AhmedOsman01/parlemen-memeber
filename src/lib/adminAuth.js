import { NextResponse } from "next/server";
import { checkBasicAuthFromHeader } from "./basicAuth";

// Admin auth helper
// Supports (in order):
// - Bearer JWT signed with ADMIN_JWT_SECRET (if jsonwebtoken available)
// - Bearer token equal to ADMIN_TOKEN
// - Basic auth via BASIC_AUTH_USER / BASIC_AUTH_PASS using existing helper

export async function authorizeAdmin(req) {
  const auth = req.headers.get("authorization") || "";

  // Basic auth check
  if (auth.toLowerCase().startsWith("basic ")) {
    const ok = checkBasicAuthFromHeader(auth);
    if (ok) return { ok: true, method: "basic" };
    return { ok: false };
  }

  // Bearer token check
  if (auth.toLowerCase().startsWith("bearer ")) {
    const token = auth.slice(7).trim();

    // 1) If ADMIN_JWT_SECRET and jsonwebtoken present, try verify
    if (process.env.ADMIN_JWT_SECRET) {
      try {
        // dynamic require to keep optional dependency
        const jwt = require("jsonwebtoken");
        const payload = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
        // consider any verified JWT as admin; optionally check payload.role
        if (payload) return { ok: true, method: "jwt", payload };
      } catch (e) {
        // fall through to next check
      }
    }

    // 2) fallback: compare to ADMIN_TOKEN
    if (process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN) {
      return { ok: true, method: "token" };
    }

    return { ok: false };
  }

  // Also allow x-admin-token header for older clients
  const tokenHeader = req.headers.get("x-admin-token");
  if (tokenHeader && process.env.ADMIN_TOKEN && tokenHeader === process.env.ADMIN_TOKEN) {
    return { ok: true, method: "x-admin-token" };
  }

  return { ok: false };
}

export function requireAdminOrResponse(req) {
  const result = authorizeAdmin(req);
  // authorizeAdmin may be async when using jwt; but if not awaited here, callers should await
  return result;
}
