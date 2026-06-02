import { NextResponse } from "next/server";
export function POST() { return NextResponse.json({ error: "Not yet configured" }, { status: 501 }); }
