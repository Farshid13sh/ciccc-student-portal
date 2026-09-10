import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import ProgressBar from "@/components/ProgressBar";
import VideoPlayerModal from "@/components/VideoPlayerModal";
import EnrollButton from "@/components/EnrollButton";
import { getSession } from "@/lib/auth";
import { courses, enrollments, lessons } from "@/lib/data";

export default async function CoursePage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) redirect("/login");

  const course = courses.find((c) => c.id === params.id);
  if (!course) notFound();

  const enrollment = enrollments.find((e) => e.courseId === course.id);
  const isEnrolled = Boolean(enrollment);
  const progress = enrollment?.progress ?? 0;
  const courseLessons = lessons.filter((l) => l.courseId === course.id);
  const totalLessons = courseLessons.length;
  const completed = Math.round((progress / 100) * totalLessons);

  return (
    <DashboardShell
      role="student"
      heading={course.title}
      subheading={`${course.code} · ${course.instructor} · ${course.duration}`}
      user={{ name: session.name, email: session.email }}
    >
      <Link href="/student/courses" className="text-sm font-medium text-slate-500 hover:text-brand-600">
        ← Back to My Courses
      </Link>

      {!isEnrolled && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-800">You're not enrolled in this course yet.</p>
          <EnrollButton courseTitle={course.title} />
        </div>
      )}

      <div className="mt-4 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <section aria-labelledby="lessons" className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <h2 id="lessons" className="border-b border-slate-200 px-5 py-3 font-semibold">
              Course content
            </h2>
            <ol>
              {courseLessons.map((lesson) => {
                const done = lesson.order <= completed;
                return (
                  <li
                    key={lesson.id}
                    className="flex items-center gap-3 border-b border-slate-100 px-5 py-3 last:border-0"
                  >
                    <span
                      aria-label={done ? "Completed" : "Not completed"}
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        done ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {done ? "✓" : lesson.order}
                    </span>
                    <span className="flex-1 text-sm font-medium">{lesson.title}</span>
                    <span className="text-xs text-slate-500">{lesson.durationMin} min</span>
                    <VideoPlayerModal
                      label="▶ Watch"
                      title={lesson.title}
                      meta={`${course.title} · Lesson ${lesson.order} · ${lesson.durationMin} min`}
                    />
                  </li>
                );
              })}
            </ol>
          </section>
        </div>

        <aside aria-label="Course progress" className="h-fit rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold">Your progress</p>
          <p className="mt-2 text-3xl font-bold text-brand-600">{progress}%</p>
          <div className="mt-2"><ProgressBar value={progress} /></div>
          <p className="mt-2 text-xs text-slate-500">
            {completed} of {totalLessons} lessons completed
          </p>
          <p className="mt-4 border-t border-slate-100 pt-4 text-sm text-slate-600">
            {course.description}
          </p>
        </aside>
      </div>
    </DashboardShell>
  );
}
