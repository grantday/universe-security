import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE = "us_admin_session";

async function isAuthed(request: NextRequest) {
  const token = request.cookies.get(COOKIE)?.value;
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!token || !secret) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isStudio = pathname.startsWith("/studio");
  const isLegacyAdmin = pathname.startsWith("/cms-admin");

  if (isStudio && pathname !== "/studio/login") {
    if (!(await isAuthed(request))) {
      const login = new URL("/studio/login", request.url);
      login.searchParams.set("next", pathname);
      return NextResponse.redirect(login);
    }
  }

  if (pathname === "/studio/login" && (await isAuthed(request))) {
    return NextResponse.redirect(new URL("/studio", request.url));
  }

  if (isLegacyAdmin) {
    const target = pathname.replace("/cms-admin", "/studio");
    return NextResponse.redirect(new URL(target === "/studio/login" ? "/studio/login" : target, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/studio", "/studio/login", "/studio/:path*", "/cms-admin", "/cms-admin/:path*"],
};
