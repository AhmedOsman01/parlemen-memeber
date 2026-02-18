import { NextResponse } from "next/server";
import { slides } from "@/data/slides";

export async function GET() {
  return NextResponse.json(slides);
}
