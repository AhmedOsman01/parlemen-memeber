export const runtime = "nodejs";

import { NextResponse } from "next/server";

// We'll attempt to use MongoDB when MONGODB_URI is configured. Otherwise fallback to file storage.
import fs from "fs";
import path from "path";
import { createContactRecord, listContacts } from "@/models/contactModel";
import { sendContactNotification } from "@/lib/mailer";
import { sanitizeContactPayload } from "@/lib/sanitize";
import { authorizeAdmin } from "@/lib/adminAuth";
import { consumeContactRate } from "@/lib/rateLimiter";

// Rate limiting is handled by `src/lib/rateLimiter.js` which will use Redis if configured,
// otherwise it falls back to a simple in-memory limiter (not suitable for multi-instance prod).

const CONTACTS_PATH = path.join(process.cwd(), "src", "data", "contacts.json");

function validateContact(body) {
  const errors = {};
  if (!body.name || !String(body.name).trim()) errors.name = "الاسم مطلوب";
  if (!body.email || !String(body.email).trim()) errors.email = "البريد الإلكتروني مطلوب";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.email = "البريد الإلكتروني غير صحيح";
  if (!body.subject || !String(body.subject).trim()) errors.subject = "الموضوع مطلوب";
  if (!body.message || String(body.message).trim().length < 10) errors.message = "الرسالة يجب أن تكون ١٠ أحرف على الأقل";
  return errors;
}

async function readContacts() {
  try {
    const raw = await fs.promises.readFile(CONTACTS_PATH, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function writeContacts(contacts) {
  const dir = path.dirname(CONTACTS_PATH);
  await fs.promises.mkdir(dir, { recursive: true });
  await fs.promises.writeFile(CONTACTS_PATH, JSON.stringify(contacts, null, 2), "utf8");
}

export async function POST(req) {
  try {
    const body = await req.json();
    // Rate limit by IP (Redis-backed when configured)
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || req.ip || 'local';
    const rate = await consumeContactRate(ip);
    if (!rate.allowed) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    // sanitize input before validation
    const clean = sanitizeContactPayload(body);
    const errors = validateContact(clean);
    if (Object.keys(errors).length) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // If MongoDB is configured, create DB record; otherwise fallback to file storage
    if (process.env.MONGODB_URI) {
      try {
        const entry = await createContactRecord({
          name: clean.name,
          email: clean.email,
          phone: clean.phone,
          subject: clean.subject,
          message: clean.message,
        });
        // send optional email notification
        try {
          await sendContactNotification(entry).catch(() => null);
        } catch (e) {
          // ignore mail errors
        }
        return NextResponse.json({ success: true, entry }, { status: 201 });
      } catch (dbErr) {
        console.error("DB contact insert error:", dbErr);
        // fallthrough to file fallback
      }
    }

    // File fallback
    const contacts = await readContacts();
    const entry = {
      id: Date.now().toString(36),
      name: clean.name,
      email: clean.email,
      phone: clean.phone,
      subject: clean.subject,
      message: clean.message,
      createdAt: new Date().toISOString(),
    };
    contacts.push(entry);
    await writeContacts(contacts);

  // Note: rate limiter already increments the counter on consumeContactRate

    return NextResponse.json({ success: true, entry }, { status: 201 });
  } catch (err) {
    console.error("/api/contact error:", err);
    return NextResponse.json({ error: "حدث خطأ في الخادم" }, { status: 500 });
  }
}

export async function GET(req) {
  // Admin-only read of contacts. Use the centralized authorizeAdmin helper
  const auth = await authorizeAdmin(req);
  if (!auth || !auth.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const urlObj = new URL(req.url);
    const page = urlObj.searchParams.get("page") || "1";
    const limit = urlObj.searchParams.get("limit") || "50";
    const q = urlObj.searchParams.get("q") || "";

    if (process.env.MONGODB_URI) {
      const { rows, total } = await listContacts({ page, limit, q });
      return NextResponse.json({ contacts: rows, total, page: Number(page), limit: Number(limit) });
    }

    // file fallback: simple filter and pagination in memory
    let rows = await readContacts();
    if (q) {
      const re = new RegExp(q, "i");
      rows = rows.filter((r) => re.test(r.name) || re.test(r.email) || re.test(r.subject) || re.test(r.message));
    }
    const total = rows.length;
    const p = Math.max(1, Number(page));
    const l = Math.max(1, Number(limit));
    const start = (p - 1) * l;
    const pageRows = rows.slice(start, start + l);
    return NextResponse.json({ contacts: pageRows, total, page: p, limit: l });
  } catch (err) {
    console.error("/api/contact GET error:", err);
    return NextResponse.json({ error: "حدث خطأ في الخادم" }, { status: 500 });
  }
}
