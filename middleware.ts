import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Auth protection is handled at the layout level via Clerk's auth() + redirect().
// Clerk's clerkMiddleware cannot run on Vercel's Edge Runtime.
export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
