import Link from "next/link";
import { redirect } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import ProgressBar from "@/components/ProgressBar";
import { getSession } from "@/lib/auth";
import { enrollments, programs } from "@/lib/data";

export default async function MyLearningPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const myPrograms = enrollments
    .map((e) => ({ program: programs.find((p) => p.id === e.courseId), progress: e.progress }))
    .filter((e): e is { program: (typeof programs)[number]; progress: number } => Boolean(e.program));

  return (
    <DashboardShell
      role="student"
      heading="My Learning"
      subheading="Pick up where you left off in your enrolled programs"
      user={{ name: session.name, email: session.email }}
    >
      {myPrograms.length === 0 ? (
        <p className="text-sm text-slate-500">
          You're not enrolled in anything yet — browse the{" "}
          <Link href="/student/courses" className="font-medium text-brand-600 hover:underline">
            Course Catalog
          </Link>{" "}
          to get started.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {myPrograms.map(({ program, progress }) => (
            <Link
              key={program.id}
              href={`/student/learn/${program.id}`}
              className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-500 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">{program.code}</span>
              <h2 className="mt-1 text-lg font-semibold text-slate-900 group-hover:text-brand-700">{program.title}</h2>
              <p className="mt-1 text-sm text-slate-500">{program.instructor} · {program.duration}</p>
              <div className="mt-4">
                <div className="mb-1 flex justify-between text-xs text-slate-600">
                  <span>Progress</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <ProgressBar value={progress} />
              </div>
              <span className="mt-4 text-sm font-semibold text-brand-700">Continue Learning →</span>
            </Link>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
