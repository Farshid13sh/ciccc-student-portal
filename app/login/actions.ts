"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession, verifyCredentials } from "@/lib/auth";
import { roleHome } from "@/lib/session";

export async function login(_prevState: { error?: string } | undefined, formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Enter both an email and a password." };
  }

  const session = await verifyCredentials(email, password);
  if (!session) {
    return { error: "That email/password combination doesn't match a demo account." };
  }

  await createSession(session);
  redirect(roleHome(session.role));
}

export async function logout() {
  await destroySession();
  redirect("/login");
}
