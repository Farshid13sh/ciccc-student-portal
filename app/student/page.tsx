import Link from "next/link";
import { redirect } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import StatCard from "@/components/StatCard";
import { getSession } from "@/lib/auth";
import { certificates, deadlines, enrollments, programs, schedule } from "@/lib/data";

export default async function StudentDashboard() {
  const session = await getSession();
  if (!session) redirect("/login");

  const myEnrollments = enrollments
    .map((e) => ({ program: programs.find((p) => p.id === e.courseId)!, progress: e.progress }))
    .filter((e) => e.program);

  const continueProgram = [...myEnrollments].sort((a, b) => b.progress - a.progress)[0];
  const totalHours = "14.5";

  return (
    <DashboardShell
      role="student"
      heading={`Welcome back, ${session.name.split(" ")[0]} 👋`}
      subheading="Here's your learning snapshot for this week."
      user={{ name: session.name, email: session.email }}
    >
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Enrolled programs" value={String(myEnrollments.length)} icon="📚" />
        <StatCard label="Learning hours" value={totalHours} hint="+2.5 this week" icon="⏱️" />
        <StatCard label="Certificates" value={String(certificates.length)} icon="🎓" />
        <StatCard label="Day streak" value="6" hint="Personal best: 12" icon="🔥" />
      </div>

      {continueProgram && (
        <section aria-labelledby="continue-heading" className="mt-6 rounded-xl border border-brand-100 bg-brand-50 p-5">
          <h2 id="continue-heading" className="text-sm font-semibold text-brand-900">
            Continue learning
          </h2>
          <p className="mt-1 font-medium">{continueProgram.program.title}</p>
          <p className="text-sm text-slate-600">You're {continueProgram.progress}% through this program.</p>
          <Link
            href={`/student/learn/${continueProgram.program.id}`}
            className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:underline"
          >
            Resume learning →
          </Link>
        </section>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="schedule-heading" className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <h2 id="schedule-heading" className="border-b border-slate-200 px-5 py-3 text-lg font-semibold">
            This week's schedule
          </h2>
          <ul className="divide-y divide-slate-100">
            {schedule.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-3 px-5 py-3 text-sm">
                <div>
                  <span className="mr-2 rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                    {s.course}
                  </span>
                  {s.title}
                  <p className="mt-0.5 text-xs text-slate-500">
                    {s.format === "Live" ? `${s.day} · ${s.start}–${s.end} · ${s.location}` : `${s.day} · Self-paced`}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded px-2 py-0.5 text-xs font-semibold ${
                    s.format === "Live" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {s.format}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="deadlines-heading" className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <h2 id="deadlines-heading" className="border-b border-slate-200 px-5 py-3 text-lg font-semibold">
            Upcoming deadlines
          </h2>
          <ul className="divide-y divide-slate-100">
            {deadlines.map((d) => (
              <li key={d.label} className="flex items-center justify-between px-5 py-3 text-sm">
                <div>
                  <span className="mr-2 rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                    {d.course}
                  </span>
                  {d.label}
                </div>
                <span className="text-slate-500">Due {d.due}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </DashboardShell>
  );
}
