"use server";

import { createSession, getSession } from "@/lib/auth";
import { updateAuthUser } from "@/lib/auth-users";

export interface ProfileState {
  error?: string;
  success?: string;
}

export async function updateProfile(
  _prevState: ProfileState | undefined,
  formData: FormData
): Promise<ProfileState> {
  const session = await getSession();
  if (!session) {
    return { error: "Your session expired — please sign in again." };
  }

  const name = String(formData.get("name") || "").trim();
  if (!name) {
    return { error: "Name can't be empty." };
  }

  const updates: { name: string; program?: string; department?: string } = { name };
  if (session.role === "student") {
    const program = String(formData.get("program") || "").trim();
    if (program) updates.program = program;
  }
  if (session.role === "instructor") {
    const department = String(formData.get("department") || "").trim();
    if (department) updates.department = department;
  }

  const updated = updateAuthUser(session.sub, updates);
  if (!updated) {
    return { error: "Couldn't find your account." };
  }

  // Re-issue the session cookie so the new name shows up immediately
  // (email/role/id never change here, so the session stays valid).
  await createSession({ sub: updated.id, name: updated.name, email: updated.email, role: updated.role });

  return { success: "Profile updated." };
}
