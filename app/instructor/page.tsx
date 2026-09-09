import { redirect } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import StatCard from "@/components/StatCard";
import Badge from "@/components/Badge";
import { getSession } from "@/lib/auth";
import { activity, courses } from "@/lib/data";

export default async function InstructorDashboard() {
  const session = await getSession();
  if (!session) redirect("/login");

  const published = courses.filter((c) => c.status === "published");

  return (
    <DashboardShell
      role="instructor"
      heading="Instructor dashboard"
      subheading={`${session.name} — Computer Science & Design`}
      user={{ name: session.name, email: session.email }}
    >
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total students" value="524" hint="+18 this week" icon="🎓" />
        <StatCard label="Published courses" value={String(published.length)} icon="📚" />
        <StatCard label="Avg. rating" value="4.8" icon="⭐" />
        <StatCard label="Submissions to grade" value="7" icon="📝" />
      </div>

      <h2 className="mt-8 text-lg font-semibold">My courses</h2>
      <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th scope="col" className="px-5 py-3 font-medium">Course</th>
              <th scope="col" className="px-5 py-3 font-medium">Category</th>
              <th scope="col" className="px-5 py-3 font-medium">Students</th>
              <th scope="col" className="px-5 py-3 font-medium">Rating</th>
              <th scope="col" className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {courses.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="px-5 py-3">
                  <span className="mr-2 text-xs font-semibold text-brand-600">{c.code}</span>
                  {c.title}
                </td>
                <td className="px-5 py-3 text-slate-600">{c.category}</td>
                <td className="px-5 py-3">{c.students}</td>
                <td className="px-5 py-3">★ {c.rating}</td>
                <td className="px-5 py-3"><Badge label={c.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
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
