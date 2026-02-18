export const runtime = "nodejs";

import { NextResponse } from "next/server";

// We'll attempt to use MongoDB when MONGODB_URI is configured. Otherwise fallback to file storage.
import fs from "fs";
import path from "path";
import { createContactRecord, listContacts } from "@/models/contactModel";
import { sendContactNotification } from "@/lib/mailer";
import { sanitizeContactPayload } from "@/lib/sanitize";
import { checkBasicAuthFromHeader } from "@/lib/basicAuth";

// Basic in-memory rate limiter: map ip -> { count, resetAt }
const RATE_LIMIT_MAX = Number(process.env.CONTACT_RATE_LIMIT_MAX) || 5;
const RATE_LIMIT_WINDOW_MS = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS) || 60 * 60 * 1000; // 1 hour
const rateMap = global._contactRateMap || (global._contactRateMap = new Map());

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
    // Rate limit by IP
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || req.ip || 'local';
    const now = Date.now();
    const state = rateMap.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
    if (now > state.resetAt) {
      state.count = 0;
      state.resetAt = now + RATE_LIMIT_WINDOW_MS;
    }
    if (state.count >= RATE_LIMIT_MAX) {
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

    // increment rate counter
    state.count += 1;
    rateMap.set(ip, state);

    return NextResponse.json({ success: true, entry }, { status: 201 });
  } catch (err) {
    console.error("/api/contact error:", err);
    return NextResponse.json({ error: "حدث خطأ في الخادم" }, { status: 500 });
  }
}

export async function GET(req) {
  // Admin-only read of contacts. Protect with ADMIN_TOKEN env var passed as header 'x-admin-token' or query param 'token'.
  const url = new URL(req.url);
  const tokenHeader = req.headers.get("x-admin-token");
  const tokenQuery = url.searchParams.get("token");
  const token = tokenHeader || tokenQuery;

  // Allow either Basic Auth header or ADMIN_TOKEN via header/query
  const authHeader = req.headers.get('authorization');
  const basicOk = checkBasicAuthFromHeader(authHeader);
  if (!basicOk) {
    if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
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
