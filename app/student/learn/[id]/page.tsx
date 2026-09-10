import { notFound, redirect } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import LearningWorkspace from "@/components/LearningWorkspace";
import { getSession } from "@/lib/auth";
import { enrollments, lessons, programs } from "@/lib/data";

export default async function LearnProgramPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) redirect("/login");

  const program = programs.find((p) => p.id === params.id);
  if (!program) notFound();

  const enrollment = enrollments.find((e) => e.courseId === program.id);
  if (!enrollment) redirect("/student/learn");

  const programLessons = lessons.filter((l) => l.courseId === program.id);

  return (
    <DashboardShell
      role="student"
      heading={program.title}
      subheading={`${program.code} · ${program.instructor} · ${program.duration}`}
      user={{ name: session.name, email: session.email }}
    >
      <LearningWorkspace program={program} lessons={programLessons} initialProgress={enrollment.progress} />
    </DashboardShell>
  );
}
