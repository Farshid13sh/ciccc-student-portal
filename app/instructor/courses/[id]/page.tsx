import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import Badge from "@/components/Badge";
import VideoPlayerModal from "@/components/VideoPlayerModal";
import CourseVideoList from "@/components/CourseVideoList";
import { getSession } from "@/lib/auth";
import { enrollments, lessons, programs, users } from "@/lib/data";

export default async function InstructorCoursePage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) redirect("/login");

  const program = programs.find((p) => p.id === params.id);
  if (!program) notFound();

  const programLessons = lessons.filter((l) => l.courseId === program.id);
  const units = Array.from(new Set(programLessons.map((l) => l.unit)));
  const roster = users.filter((u) => u.role === "student");

  return (
    <DashboardShell
      role="instructor"
      heading={program.title}
      subheading={`${program.code} · ${program.category} · ${program.duration}`}
      user={{ name: session.name, email: session.email }}
    >
      <Link href="/instructor/courses" className="text-sm font-medium text-slate-500 hover:text-brand-600">
        ← Back to Programs
      </Link>

      <div className="mt-4 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Program info</h2>
              <Badge label={program.status} />
            </div>
            <p className="mt-2 text-sm text-slate-600">{program.description}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
              <span>{program.lessons} lessons</span>
              <span>★ {program.rating}</span>
              <span>{program.students} students</span>
              <span>${program.tuitionDomestic.toLocaleString()} tuition</span>
            </div>
          </section>

          <section aria-labelledby="curriculum" className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <h2 id="curriculum" className="border-b border-slate-200 px-5 py-3 text-sm font-semibold">
              Curriculum
            </h2>
            {programLessons.length === 0 ? (
              <p className="px-5 py-6 text-sm text-slate-500">No lessons published for this program yet.</p>
            ) : (
              units.map((unit) => (
                <div key={unit}>
                  <p className="bg-slate-50 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {unit}
                  </p>
                  <ol>
                    {programLessons
                      .filter((l) => l.unit === unit)
                      .map((lesson) => (
                        <li
                          key={lesson.id}
                          className="flex items-center gap-3 border-b border-slate-100 px-5 py-3 text-sm last:border-0"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">
                            {lesson.order}
                          </span>
                          <span className="flex-1 font-medium">
                            {lesson.title}
                            <span className="ml-2 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-slate-500">
                              {lesson.type}
                            </span>
                          </span>
                          <span className="text-xs text-slate-500">{lesson.durationMin} min</span>
                          {lesson.type === "video" && (
                            <VideoPlayerModal
                              label="▶ Preview"
                              title={lesson.title}
                              meta={`${program.title} · Lesson ${lesson.order}`}
                            />
                          )}
                        </li>
                      ))}
                  </ol>
                </div>
              ))
            )}
          </section>

          <section aria-labelledby="videos" className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3">
              <h2 id="videos" className="text-sm font-semibold">Uploaded videos</h2>
              <Link
                href={`/instructor/uploads?course=${program.code}`}
                className="text-xs font-semibold text-brand-600 hover:underline"
              >
                + Upload video
              </Link>
            </div>
            <CourseVideoList courseCode={program.code} />
          </section>
        </div>

        <aside aria-label="Roster" className="h-fit overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <h2 className="border-b border-slate-200 px-5 py-3 text-sm font-semibold">
            Roster ({roster.length})
          </h2>
          <ul className="divide-y divide-slate-100">
            {roster.map((s) => {
              const enrollment = s.name === "Maya Chen" ? enrollments.find((e) => e.courseId === program.id) : undefined;
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
