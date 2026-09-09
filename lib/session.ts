// Edge-safe session token helpers (used by both middleware and server code).
// No Node-only APIs here (no bcrypt, no next/headers) so this file can run
// in the Edge runtime that Next.js middleware uses.
import { SignJWT, jwtVerify } from "jose";
import type { Role } from "./types";

export const SESSION_COOKIE = "bp_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24; // 1 day

// Demo-only fallback so `npm run dev` works with zero setup, per the README's
// "no environment variables required" promise. Set SESSION_SECRET in a real
// deployment — see .env.local.example.
const secretValue = process.env.SESSION_SECRET || "brightpath-lms-demo-insecure-default-secret";
const secretKey = new TextEncoder().encode(secretValue);

export interface SessionPayload {
  sub: string; // user id
  name: string;
  email: string;
  role: Role;
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(secretKey);
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    if (
      typeof payload.sub === "string" &&
      typeof payload.name === "string" &&
      typeof payload.email === "string" &&
      (payload.role === "student" || payload.role === "instructor" || payload.role === "admin")
    ) {
      return {
        sub: payload.sub,
        name: payload.name,
        email: payload.email,
        role: payload.role,
      };
    }
    return null;
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_TTL_SECONDS,
};

export function roleHome(role: Role): string {
  return `/${role}`;
}
