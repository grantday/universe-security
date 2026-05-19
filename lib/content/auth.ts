import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE = "us_admin_session";

function secret() {
  const s = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!s || s.length < 8) {
    throw new Error("Set ADMIN_PASSWORD (min 8 characters) in Vercel environment variables.");
  }
  return new TextEncoder().encode(s);
}

export function adminSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 12,
  };
}

export async function signAdminSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(secret());
}

export async function createAdminSession() {
  const token = await signAdminSessionToken();
  cookies().set(COOKIE, token, adminSessionCookieOptions());
  return token;
}

export async function clearAdminSession() {
  cookies().set(COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const token = cookies().get(COOKIE)?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, secret());
    return true;
  } catch {
    return false;
  }
}

export function verifyAdminPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return input === expected;
}
