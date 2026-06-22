import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE = "ss_session";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = req.cookies.get(COOKIE)?.value;

  // حماية لوحات التحكم
  if (pathname.startsWith("/dashboard") && !session) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // تحويل المستخدم المسجّل بعيداً عن صفحة الدخول
  if (pathname === "/login" && session) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
