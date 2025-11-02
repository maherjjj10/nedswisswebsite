import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export function middleware(_: NextRequest) {
  const isProd = process.env.VERCEL_ENV === "production";
  const res = NextResponse.next();
  if (!isProd) res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}
