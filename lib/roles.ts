import type { Role } from "./types";

export const ROLES: Role[] = ["student", "instructor", "admin"];

export function isRole(value: string): value is Role {
  return (ROLES as string[]).includes(value);
}

export const roleMeta: Record<Role, { label: string; blurb: string; allowSignup: boolean }> = {
  student: {
    label: "Student",
    blurb: "Browse programs, track progress, view deadlines",
    allowSignup: true,
  },
  instructor: {
    label: "Instructor",
    blurb: "Manage programs, students, attendance",
    allowSignup: true,
  },
  admin: {
    label: "Admin",
    blurb: "Oversee users, payments, and platform activity",
    allowSignup: false,
  },
};
