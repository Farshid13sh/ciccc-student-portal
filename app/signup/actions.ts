"use server";

import { redirect } from "next/navigation";
import { registerUser } from "@/lib/auth";
import { EmailInUseError } from "@/lib/auth-users";
import { isRole, roleMeta } from "@/lib/roles";

export interface SignupState {
  error?: string;
}

export async function signup(_prevState: SignupState | undefined, formData: FormData): Promise<SignupState> {
  const role = String(formData.get("role") || "");
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  if (!isRole(role) || !roleMeta[role].allowSignup) {
    return { error: "Sign-up isn't available for that portal." };
  }
  if (!name || !email || !password) {
    return { error: "Name, email, and password are required." };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  if (password !== confirmPassword) {
    return { error: "Passwords don't match." };
  }

  let studentId: string | undefined;
  let program: string | undefined;
  let employeeId: string | undefined;
  let department: string | undefined;

  if (role === "student") {
    studentId = String(formData.get("studentId") || "").trim();
    program = String(formData.get("program") || "").trim();
    if (!studentId) {
      return { error: "Student ID is required to register for the school platform." };
    }
  }

  if (role === "instructor") {
    employeeId = String(formData.get("employeeId") || "").trim();
    department = String(formData.get("department") || "").trim();
    if (!employeeId) {
      return { error: "Employee ID is required to register as an instructor." };
    }
  }

  try {
    await registerUser({ name, email, password, role, studentId, program, employeeId, department });
  } catch (err) {
    if (err instanceof EmailInUseError) {
      return { error: err.message };
    }
    return { error: "Something went wrong creating the account. Please try again." };
  }

  redirect(`/login/${role}?created=1&email=${encodeURIComponent(email)}`);
}
