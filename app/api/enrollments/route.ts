// Auth-gated endpoint: reads the same signed session cookie as the rest of
// the app (no separate API auth scheme to maintain) and 401s without it.
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { enrollments, programs } from "@/lib/data";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  if (session.role !== "student") {
    return NextResponse.json({ error: "Only student accounts have enrollments" }, { status: 403 });
  }

  const results = enrollments
    .map((e) => {
      const program = programs.find((p) => p.id === e.courseId);
      return program ? { program, progress: e.progress, enrolled: e.enrolled } : null;
    })
    .filter((e): e is { program: (typeof programs)[number]; progress: number; enrolled: string } => e !== null);

  return NextResponse.json({ student: session.name, count: results.length, enrollments: results });
}
