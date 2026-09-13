import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { notificationsForRole } from "@/lib/notifications";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.json({ role: session.role, notifications: notificationsForRole(session.role) });
}
