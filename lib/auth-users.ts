// Seeded credentials for the auth demo.
// Mirrors the display rows in lib/data.ts (same ids/emails/roles) but keeps
// password hashes out of any table that gets rendered in the UI.
import type { Role } from "./types";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  // bcrypt hash of the shared demo password "brightpath123"
  passwordHash: string;
}

const DEMO_HASH = "$2b$10$dFyRBTyXxyESlGykvJGHset1iSa.k4LEUH1b.lOKwwfczSUTdw83O";

export const authUsers: AuthUser[] = [
  { id: "a1", name: "Maya Chen", email: "maya@brightpath.dev", role: "student", passwordHash: DEMO_HASH },
  { id: "a2", name: "Leo Park", email: "leo@brightpath.dev", role: "student", passwordHash: DEMO_HASH },
  { id: "a3", name: "Dr. Sofia Reyes", email: "sofia@brightpath.dev", role: "instructor", passwordHash: DEMO_HASH },
  { id: "a4", name: "Admin Torres", email: "admin@brightpath.dev", role: "admin", passwordHash: DEMO_HASH },
];

export function findAuthUserByEmail(email: string): AuthUser | undefined {
  return authUsers.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
}
