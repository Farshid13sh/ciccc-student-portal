import { NextResponse } from "next/server";
import { lessons, programs } from "@/lib/data";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const program = programs.find((p) => p.id === params.id);
  if (!program) {
    return NextResponse.json({ error: "Program not found" }, { status: 404 });
  }

  const programLessons = lessons
    .filter((l) => l.courseId === program.id)
    .sort((a, b) => a.order - b.order);

  return NextResponse.json({ program, lessons: programLessons });
}
