// Seeded + sign-up-created credentials for the auth demo.
// This is an in-memory store: it lives for as long as the Node dev/prod
// process stays running (perfect for a demo, not for real persistence —
// see README). Password hashes are kept out of lib/data.ts's UserRow type
// so nothing rendered in the admin table ever includes them.
import bcrypt from "bcryptjs";
import type { Role } from "./types";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  passwordHash: string;
  // Role-specific "necessary for school auth" fields
  studentId?: string; // student
  program?: string; // student
  employeeId?: string; // instructor
  department?: string; // instructor
}

// bcrypt hash of the shared demo password "ciccc123"
const DEMO_HASH = "$2b$10$o1ECNc8UzuigTyGfn0yYN.0FB3y1JtxOmh3azP4BLO9wCRX2dkUfm";

export const authUsers: AuthUser[] = [
  {
    id: "a1", name: "Maya Chen", email: "maya@ciccc-demo.ca", role: "student",
    passwordHash: DEMO_HASH, studentId: "S-100234", program: "Cybersecurity Diploma",
  },
  {
    id: "a2", name: "Leo Park", email: "leo@ciccc-demo.ca", role: "student",
    passwordHash: DEMO_HASH, studentId: "S-100255", program: "International Business Management Diploma",
  },
  {
    id: "a3", name: "Dr. Amara Chen", email: "amara@ciccc-demo.ca", role: "instructor",
    passwordHash: DEMO_HASH, employeeId: "E-500011", department: "Technology & AI",
  },
  {
    id: "a4", name: "Admin Torres", email: "admin@ciccc-demo.ca", role: "admin",
    passwordHash: DEMO_HASH,
  },
];

export function findAuthUserById(id: string): AuthUser | undefined {
  return authUsers.find((u) => u.id === id);
}

export function updateAuthUser(
  id: string,
  updates: Partial<Pick<AuthUser, "name" | "program" | "department">>
): AuthUser | undefined {
  const user = authUsers.find((u) => u.id === id);
  if (!user) return undefined;
  Object.assign(user, updates);
  return user;
}

export function findAuthUserByEmail(email: string): AuthUser | undefined {
  const needle = email.trim().toLowerCase();
  return authUsers.find((u) => u.email.toLowerCase() === needle);
}

export function findAuthUserByEmailAndRole(email: string, role: Role): AuthUser | undefined {
  const user = findAuthUserByEmail(email);
  return user && user.role === role ? user : undefined;
}

// The seeded persona shown for "quick demo login" and the mock Google
// account picker — always the first seeded (not sign-up-created) account
// for that role.
export function demoPersonaForRole(role: Role): AuthUser {
  const seeded = authUsers.filter((u) => !u.id.startsWith("new-"));
  const found = seeded.find((u) => u.role === role);
  if (!found) throw new Error(`No seeded demo account for role "${role}"`);
  return found;
}

export interface CreateAuthUserInput {
  name: string;
  email: string;
  password: string;
  role: Role;
  studentId?: string;
  program?: string;
  employeeId?: string;
  department?: string;
}

export class EmailInUseError extends Error {}

export async function createAuthUser(input: CreateAuthUserInput): Promise<AuthUser> {
  if (findAuthUserByEmail(input.email)) {
    throw new EmailInUseError("An account with this email already exists.");
  }
  const passwordHash = await bcrypt.hash(input.password, 10);
  const user: AuthUser = {
    id: `new-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    name: input.name,
    email: input.email,
    role: input.role,
    passwordHash,
    studentId: input.studentId,
    program: input.program,
    employeeId: input.employeeId,
    department: input.department,
  };
  authUsers.push(user);
  return user;
}
