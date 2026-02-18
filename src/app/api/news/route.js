import { NextResponse } from "next/server";
import { newsArticles } from "@/data/news";

export async function GET() {
  return NextResponse.json(newsArticles);
}
