// Node-only auth helpers: password verification + reading/writing the
// session cookie from Server Components / Server Actions.
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import {
  createAuthUser,
  demoPersonaForRole,
  findAuthUserByEmailAndRole,
  type CreateAuthUserInput,
} from "./auth-users";
import type { Role } from "./types";
import {
  SESSION_COOKIE,
  sessionCookieOptions,
  signSession,
  verifySessionToken,
  type SessionPayload,
} from "./session";

function toSession(user: { id: string; name: string; email: string; role: Role }): SessionPayload {
  return { sub: user.id, name: user.name, email: user.email, role: user.role };
}

// Real credential check, but scoped to the role the person picked on the
// role-selection screen: an otherwise-correct email/password pair for a
// DIFFERENT role is rejected here too, exactly like the demo scope asks —
// nobody signs in to a portal that isn't theirs.
export async function verifyCredentials(
  email: string,
  password: string,
  role: Role
): Promise<SessionPayload | null> {
  const user = findAuthUserByEmailAndRole(email, role);
  if (!user) return null;

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;

  return toSession(user);
}

// Mocks "Google already verified this identity" — no password involved,
// but still only signs in an account that actually exists for that role.
export async function googleSignIn(role: Role): Promise<SessionPayload> {
  const user = demoPersonaForRole(role);
  return toSession(user);
}

export async function registerUser(input: CreateAuthUserInput): Promise<SessionPayload> {
  const user = await createAuthUser(input);
  return toSession(user);
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
