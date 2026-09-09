import { redirect } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import CourseCard from "@/components/CourseCard";
import StatCard from "@/components/StatCard";
import { getSession } from "@/lib/auth";
import { courses, deadlines, enrollments } from "@/lib/data";

export default async function StudentDashboard() {
  const session = await getSession();
  if (!session) redirect("/login");

  const myEnrollments = enrollments
    .map((e) => ({ course: courses.find((c) => c.id === e.courseId)!, progress: e.progress }))
    .filter((e) => e.course);

  const continueCourse = [...myEnrollments].sort((a, b) => b.progress - a.progress)[0];
  const totalHours = "14.5";

  return (
    <DashboardShell
      role="student"
      heading={`Welcome back, ${session.name.split(" ")[0]} 👋`}
      subheading="Here's your learning snapshot for this week."
      user={{ name: session.name, email: session.email }}
    >
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Enrolled courses" value={String(myEnrollments.length)} icon="📚" />
        <StatCard label="Learning hours" value={totalHours} hint="+2.5 this week" icon="⏱️" />
        <StatCard label="Certificates" value="1" icon="🎓" />
        <StatCard label="Day streak" value="6" hint="Personal best: 12" icon="🔥" />
      </div>

      {continueCourse && (
        <section aria-labelledby="continue-heading" className="mt-6 rounded-xl border border-brand-100 bg-brand-50 p-5">
          <h2 id="continue-heading" className="text-sm font-semibold text-brand-900">
            Continue learning
          </h2>
          <p className="mt-1 font-medium">{continueCourse.course.title}</p>
          <p className="text-sm text-slate-600">
            You're {continueCourse.progress}% through — next up: Fetch &amp; APIs
          </p>
        </section>
      )}

      <h2 className="mt-8 text-lg font-semibold">My courses</h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {myEnrollments.map(({ course, progress }) => (
          <CourseCard key={course.id} course={course} progress={progress} />
        ))}
      </div>

      <h2 className="mt-8 text-lg font-semibold">Upcoming deadlines</h2>
      <ul className="mt-3 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white shadow-sm">
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
    </DashboardShell>
  );
}
