import { redirect } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import StatCard from "@/components/StatCard";
import ProgressBar from "@/components/ProgressBar";
import { getSession } from "@/lib/auth";
import { courses, payments } from "@/lib/data";

export default async function AdminReportsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const revenueByCourse = courses
    .map((c) => ({
      course: c,
      revenue: payments.filter((p) => p.course === c.code && p.status === "paid").reduce((sum, p) => sum + p.amount, 0),
    }))
    .sort((a, b) => b.revenue - a.revenue);
  const maxRevenue = Math.max(1, ...revenueByCourse.map((r) => r.revenue));

  const byCategory = new Map<string, number>();
  for (const c of courses) byCategory.set(c.category, (byCategory.get(c.category) ?? 0) + c.students);
  const categoryRows = Array.from(byCategory.entries()).sort((a, b) => b[1] - a[1]);
  const maxStudents = Math.max(1, ...categoryRows.map(([, n]) => n));

  return (
    <DashboardShell
      role="admin"
      heading="Reports"
      subheading="Platform performance at a glance"
      user={{ name: session.name, email: session.email }}
    >
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total revenue (demo)" value={`$${revenueByCourse.reduce((s, r) => s + r.revenue, 0)}`} icon="💰" />
        <StatCard label="Active courses" value={String(courses.filter((c) => c.status === "published").length)} icon="📚" />
        <StatCard label="Total enrollments" value={String(courses.reduce((s, c) => s + c.students, 0))} icon="👥" />
        <StatCard label="Avg. course rating" value={(courses.reduce((s, c) => s + c.rating, 0) / courses.length).toFixed(1)} icon="⭐" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="revenue-heading" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 id="revenue-heading" className="text-sm font-semibold">Revenue by course</h2>
          <ul className="mt-4 space-y-4">
            {revenueByCourse.map(({ course, revenue }) => (
              <li key={course.id}>
                <div className="mb-1 flex justify-between text-xs text-slate-600">
                  <span>{course.code} · {course.title}</span>
                  <span className="font-medium">${revenue}</span>
                </div>
                <ProgressBar value={Math.round((revenue / maxRevenue) * 100)} />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="category-heading" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 id="category-heading" className="text-sm font-semibold">Enrollment by category</h2>
          <ul className="mt-4 space-y-4">
            {categoryRows.map(([category, count]) => (
              <li key={category}>
                <div className="mb-1 flex justify-between text-xs text-slate-600">
                  <span>{category}</span>
                  <span className="font-medium">{count} students</span>
                </div>
                <ProgressBar value={Math.round((count / maxStudents) * 100)} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </DashboardShell>
  );
}
