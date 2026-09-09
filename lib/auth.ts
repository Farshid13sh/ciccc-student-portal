// Node-only auth helpers: password verification + reading/writing the
// session cookie from Server Components / Server Actions.
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { findAuthUserByEmail } from "./auth-users";
import {
  SESSION_COOKIE,
  sessionCookieOptions,
  signSession,
  verifySessionToken,
  type SessionPayload,
} from "./session";

export async function verifyCredentials(
  email: string,
  password: string
): Promise<SessionPayload | null> {
  const user = findAuthUserByEmail(email);
  if (!user) return null;

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;

  return { sub: user.id, name: user.name, email: user.email, role: user.role };
}

export async function createSession(payload: SessionPayload): Promise<void> {
  const token = await signSession(payload);
  cookies().set(SESSION_COOKIE, token, sessionCookieOptions);
}

export async function destroySession(): Promise<void> {
  cookies().set(SESSION_COOKIE, "", { ...sessionCookieOptions, maxAge: 0 });
}

export async function getSession(): Promise<SessionPayload | null> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
