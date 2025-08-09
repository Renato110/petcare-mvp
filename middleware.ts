import { NextResponse } from "next/server";
export function middleware() {
  const res = NextResponse.next();
  res.headers.set("X-Frame-Options","DENY");
  res.headers.set("X-Content-Type-Options","nosniff");
  res.headers.set("Referrer-Policy","strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy","camera=(), microphone=(), geolocation=()");
  res.headers.set("Content-Security-Policy",
    "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self' https://*.supabase.co");
  return res;
}
