"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession, googleSignIn, verifyCredentials } from "@/lib/auth";
import { demoPersonaForRole } from "@/lib/auth-users";
import { roleHome } from "@/lib/session";
import { isRole } from "@/lib/roles";

export interface LoginState {
  error?: string;
}

export async function login(_prevState: LoginState | undefined, formData: FormData): Promise<LoginState> {
  const role = String(formData.get("role") || "");
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  if (!isRole(role)) {
    return { error: "Unknown portal — please start over from the role selection screen." };
  }
  if (!email || !password) {
    return { error: "Enter both an email and a password." };
  }

  const session = await verifyCredentials(email, password, role);
  if (!session) {
    const persona = demoPersonaForRole(role);
    return {
      error:
        `That email/password doesn't match a ${role} account. ` +
        `Try the seeded demo account for this portal: ${persona.email} (password: ciccc123), ` +
        `or sign in with an account you created via Sign up.`,
    };
  }

  await createSession(session);
  redirect(roleHome(session.role));
}

// Mock "Continue with Google" — no password, but still scoped to an
// account that actually exists for the chosen role.
export async function googleLogin(formData: FormData): Promise<void> {
  const role = String(formData.get("role") || "");
  if (!isRole(role)) redirect("/login");

  const session = await googleSignIn(role);
  await createSession(session);
  redirect(roleHome(session.role));
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/login");
}
