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

  if (pathname.startsWith("/cms-admin") && pathname !== "/cms-admin/login") {
    if (!(await isAuthed(request))) {
      const login = new URL("/cms-admin/login", request.url);
      login.searchParams.set("next", pathname);
      return NextResponse.redirect(login);
    }
  }

  if (pathname === "/cms-admin/login" && (await isAuthed(request))) {
    return NextResponse.redirect(new URL("/cms-admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cms-admin", "/cms-admin/login", "/cms-admin/:path*"],
};
