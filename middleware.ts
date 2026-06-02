import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

// Match a path that never exists — keeps Vercel's router happy while middleware is a no-op
export const config = {
  matcher: ["/__disabled__"],
};
