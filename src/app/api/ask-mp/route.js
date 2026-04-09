export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createAskMP, getAskMPByRef } from "@/models/askmpModel";

function validate(body) {
  const errors = {};
  if (!body.name || !String(body.name).trim()) errors.name = "الاسم مطلوب";
  if (!body.question || String(body.question).trim().length < 10) errors.question = "السؤال يجب أن يكون ١٠ أحرف على الأقل";
  return errors;
}

/**
 * POST /api/ask-mp — Submit a question to the MP
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const errors = validate(body);
    if (Object.keys(errors).length) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const record = await createAskMP({
      name: String(body.name).trim(),
      email: body.email ? String(body.email).trim() : '',
      question: String(body.question).trim(),
    });

    return NextResponse.json({
      success: true,
      refNumber: record.refNumber,
      message: "تم إرسال سؤالك بنجاح!",
    }, { status: 201 });
  } catch (err) {
    console.error("/api/ask-mp POST error:", err);
    return NextResponse.json({ error: "حدث خطأ في الخادم" }, { status: 500 });
  }
}

/**
 * GET /api/ask-mp?ref=ASK-XXXXXX — Look up question by reference
 */
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const ref = url.searchParams.get("ref");
    if (!ref) {
      return NextResponse.json({ error: "الرقم المرجعي مطلوب" }, { status: 400 });
    }

    const record = await getAskMPByRef(ref.toUpperCase());
    if (!record) {
      return NextResponse.json({ error: "لم يتم العثور على سؤال بهذا الرقم المرجعي" }, { status: 404 });
    }

    return NextResponse.json({
      refNumber: record.refNumber,
      status: record.status,
      question: record.question,
      reply: record.reply,
      createdAt: record.createdAt,
    });
  } catch (err) {
    console.error("/api/ask-mp GET error:", err);
    return NextResponse.json({ error: "حدث خطأ في الخادم" }, { status: 500 });
  }
}
