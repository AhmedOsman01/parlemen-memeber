import { NextResponse } from "next/server";
import { listContacts } from "@/models/contactModel";
import { checkBasicAuthFromHeader } from "@/lib/basicAuth";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function GET(req) {
  const url = new URL(req.url);
  const tokenHeader = req.headers.get("x-admin-token");
  const tokenQuery = url.searchParams.get("token");
  const token = tokenHeader || tokenQuery;

  const authHeader = req.headers.get('authorization');
  const basicOk = checkBasicAuthFromHeader(authHeader);
  if (!basicOk) {
    if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const page = url.searchParams.get("page") || "1";
    const limit = url.searchParams.get("limit") || "1000";
    const q = url.searchParams.get("q") || "";

    const { rows } = await listContacts({ page, limit, q });

    // build CSV
    const headers = ["id", "name", "email", "phone", "subject", "message", "createdAt"];
    const escape = (str = "") => `"${String(str).replace(/"/g, '""')}"`;
    const lines = [headers.join(",")];
    for (const r of rows) {
      lines.push([
        escape(r.id),
        escape(r.name),
        escape(r.email),
        escape(r.phone),
        escape(r.subject),
        escape(r.message),
        escape(r.createdAt),
      ].join(","));
    }
    const csv = lines.join("\n");

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="contacts-${Date.now()}.csv"`,
      },
    });
  } catch (err) {
    console.error("/api/contact/export error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
