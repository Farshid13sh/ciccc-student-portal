import { redirect } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import CourseCard from "@/components/CourseCard";
import { getSession } from "@/lib/auth";
import { courses, enrollments } from "@/lib/data";

export default async function StudentCoursesPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const enrolled = enrollments
    .map((e) => ({ course: courses.find((c) => c.id === e.courseId)!, progress: e.progress }))
    .filter((e) => e.course);

  const enrolledIds = new Set(enrolled.map((e) => e.course.id));
  const explore = courses.filter((c) => !enrolledIds.has(c.id) && c.status === "published");
  const comingSoon = courses.filter((c) => !enrolledIds.has(c.id) && c.status !== "published");

  return (
    <DashboardShell
      role="student"
      heading="My Courses"
      subheading="Everything you're enrolled in, plus more to explore."
      user={{ name: session.name, email: session.email }}
    >
      <h2 className="text-lg font-semibold">Enrolled ({enrolled.length})</h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {enrolled.map(({ course, progress }) => (
          <CourseCard key={course.id} course={course} progress={progress} />
        ))}
      </div>

      {explore.length > 0 && (
        <>
          <h2 className="mt-10 text-lg font-semibold">Explore more courses</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {explore.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </>
      )}

      {comingSoon.length > 0 && (
        <>
          <h2 className="mt-10 text-lg font-semibold text-slate-500">Coming soon</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {comingSoon.map((course) => (
              <div
                key={course.id}
                className="flex flex-col rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 opacity-70"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {course.code}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-slate-600">{course.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{course.description}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </DashboardShell>
  );
}
