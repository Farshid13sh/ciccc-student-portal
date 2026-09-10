import Link from "next/link";
import { redirect } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import StatCard from "@/components/StatCard";
import { getSession } from "@/lib/auth";
import { activity, programs } from "@/lib/data";

export default async function InstructorDashboard() {
  const session = await getSession();
  if (!session) redirect("/login");

  const published = programs.filter((p) => p.status === "published" && p.instructor === session.name);
  const myPrograms = programs.filter((p) => p.instructor === session.name);
  const avgRating = myPrograms.length
    ? (myPrograms.reduce((sum, p) => sum + p.rating, 0) / myPrograms.length).toFixed(1)
    : "—";

  return (
    <DashboardShell
      role="instructor"
      heading="Instructor dashboard"
      subheading={`${session.name} — ${myPrograms[0]?.category ?? "CICCC"} faculty`}
      user={{ name: session.name, email: session.email }}
    >
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total students" value="524" hint="+18 this week" icon="🎓" />
        <StatCard label="Published programs" value={String(published.length)} icon="📚" />
        <StatCard label="Avg. rating" value={avgRating} icon="⭐" />
        <StatCard label="Submissions to grade" value="7" icon="📝" />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/instructor/courses"
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-500 hover:text-brand-700"
        >
          Manage programs →
        </Link>
        <Link
          href="/instructor/uploads"
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-500 hover:text-brand-700"
        >
          Upload a video →
        </Link>
        <Link
          href="/instructor/attendance"
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-500 hover:text-brand-700"
        >
          Take attendance →
        </Link>
      </div>

      <h2 className="mt-8 text-lg font-semibold">Recent activity</h2>
      <ul className="mt-3 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white shadow-sm">
        {activity.map((a) => (
          <li key={a.what} className="px-5 py-3 text-sm">
            <span className="font-medium">{a.who}</span>{" "}
            <span className="text-slate-600">{a.what}</span>
            <span className="float-right text-xs text-slate-400">{a.when}</span>
          </li>
        ))}
      </ul>
    </DashboardShell>
  );
}
