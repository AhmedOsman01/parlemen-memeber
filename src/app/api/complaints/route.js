export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createComplaint, getComplaintByRef } from "@/models/complaintModel";

function validate(body) {
  const errors = {};
  if (!body.name || !String(body.name).trim()) errors.name = "الاسم مطلوب";
  if (!body.subject || !String(body.subject).trim()) errors.subject = "الموضوع مطلوب";
  if (!body.description || String(body.description).trim().length < 10) errors.description = "الوصف يجب أن يكون ١٠ أحرف على الأقل";
  if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.email = "البريد الإلكتروني غير صحيح";
  return errors;
}

/**
 * POST /api/complaints — Submit a complaint or service request
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const errors = validate(body);
    if (Object.keys(errors).length) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const record = await createComplaint({
      name: String(body.name).trim(),
      email: body.email ? String(body.email).trim() : '',
      phone: body.phone ? String(body.phone).trim() : '',
      category: body.category ? String(body.category).trim() : 'عام',
      subject: String(body.subject).trim(),
      description: String(body.description).trim(),
    });

    return NextResponse.json({
      success: true,
      refNumber: record.refNumber,
      message: "تم استلام طلبك بنجاح! يمكنك متابعة حالته بالرقم المرجعي.",
    }, { status: 201 });
  } catch (err) {
    console.error("/api/complaints POST error:", err);
    return NextResponse.json({ error: "حدث خطأ في الخادم" }, { status: 500 });
  }
}

/**
 * GET /api/complaints?ref=CMP-XXXXXX — Track complaint by reference number
 */
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const ref = url.searchParams.get("ref");
    if (!ref) {
      return NextResponse.json({ error: "الرقم المرجعي مطلوب" }, { status: 400 });
    }

    const record = await getComplaintByRef(ref);
    if (!record) {
      return NextResponse.json({ error: "لم يتم العثور على طلب بهذا الرقم المرجعي" }, { status: 404 });
    }

    return NextResponse.json({
      refNumber: record.refNumber,
      category: record.category,
      subject: record.subject,
      status: record.status,
      statusHistory: record.statusHistory?.map(h => ({
        status: h.status,
        date: h.date instanceof Date ? h.date.toISOString() : h.date,
        note: h.note,
      })),
      createdAt: record.createdAt,
    });
  } catch (err) {
    console.error("/api/complaints GET error:", err);
    return NextResponse.json({ error: "حدث خطأ في الخادم" }, { status: 500 });
  }
}
