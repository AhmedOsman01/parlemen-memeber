import { NextResponse } from "next/server";
import { newsArticles } from "@/data/news";
import { listNews } from "@/models/newsModel";

export async function GET() {
  const { rows } = await listNews({ limit: 100 });
  return NextResponse.json(rows.length > 0 ? rows : newsArticles);
}
