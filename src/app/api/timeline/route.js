import { NextResponse } from "next/server";
import { timelineData } from "@/data/timeline";

export async function GET() {
  return NextResponse.json(timelineData);
}
