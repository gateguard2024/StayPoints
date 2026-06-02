import { NextResponse } from "next/server";
export function GET() { return NextResponse.json({ error: "Not yet configured" }, { status: 501 }); }
