import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import Badge from "@/components/Badge";
import VideoPlayerModal from "@/components/VideoPlayerModal";
import CourseVideoList from "@/components/CourseVideoList";
import { getSession } from "@/lib/auth";
import { courses, enrollments, lessons, users } from "@/lib/data";

export default async function InstructorCoursePage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) redirect("/login");

  const course = courses.find((c) => c.id === params.id);
  if (!course) notFound();

  const courseLessons = lessons.filter((l) => l.courseId === course.id);
  const roster = users.filter((u) => u.role === "student");

  return (
    <DashboardShell
      role="instructor"
      heading={course.title}
      subheading={`${course.code} · ${course.category} · ${course.duration}`}
      user={{ name: session.name, email: session.email }}
    >
      <Link href="/instructor/courses" className="text-sm font-medium text-slate-500 hover:text-brand-600">
        ← Back to My Courses
      </Link>

      <div className="mt-4 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Course info</h2>
              <Badge label={course.status} />
            </div>
            <p className="mt-2 text-sm text-slate-600">{course.description}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
              <span>{course.lessons} lessons</span>
              <span>★ {course.rating}</span>
              <span>{course.students} students</span>
              <span>${course.price}</span>
            </div>
          </section>

          <section aria-labelledby="curriculum" className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <h2 id="curriculum" className="border-b border-slate-200 px-5 py-3 text-sm font-semibold">
              Curriculum
            </h2>
            <ol>
              {courseLessons.map((lesson) => (
                <li
                  key={lesson.id}
                  className="flex items-center gap-3 border-b border-slate-100 px-5 py-3 text-sm last:border-0"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">
                    {lesson.order}
                  </span>
                  <span className="flex-1 font-medium">{lesson.title}</span>
                  <span className="text-xs text-slate-500">{lesson.durationMin} min</span>
                  <VideoPlayerModal
                    label="▶ Preview"
                    title={lesson.title}
                    meta={`${course.title} · Lesson ${lesson.order}`}
                  />
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="videos" className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3">
              <h2 id="videos" className="text-sm font-semibold">Uploaded videos</h2>
              <Link
                href={`/instructor/uploads?course=${course.code}`}
                className="text-xs font-semibold text-brand-600 hover:underline"
              >
                + Upload video
              </Link>
            </div>
            <CourseVideoList courseCode={course.code} />
          </section>
        </div>

        <aside aria-label="Roster" className="h-fit overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <h2 className="border-b border-slate-200 px-5 py-3 text-sm font-semibold">
            Roster ({roster.length})
          </h2>
          <ul className="divide-y divide-slate-100">
            {roster.map((s) => {
              const enrollment = s.name === "Maya Chen" ? enrollments.find((e) => e.courseId === course.id) : undefined;
              return (
                <li key={s.id} className="px-5 py-3 text-sm">
                  <p className="font-medium">{s.name}</p>
                  <p className="text-xs text-slate-500">{s.email}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {enrollment ? `${enrollment.progress}% complete` : "Not started"}
                  </p>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </DashboardShell>
  );
}
