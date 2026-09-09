import Link from "next/link";
import type { Course } from "@/lib/types";
import ProgressBar from "./ProgressBar";
import Badge from "./Badge";

export default function CourseCard({
  course, progress,
}: {
  course: Course; progress?: number;
}) {
  return (
    <Link
      href={`/student/courses/${course.id}`}
      className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-500 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          {course.code}
        </span>
        <Badge label={course.status} />
      </div>
      <h3 className="mt-2 text-lg font-semibold leading-snug group-hover:text-brand-700">
        {course.title}
      </h3>
      <p className="mt-1 line-clamp-2 text-sm text-slate-600">{course.description}</p>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
        <span>{course.lessons} lessons</span>
        <span>{course.duration}</span>
        <span>★ {course.rating}</span>
        <span>{course.students} students</span>
      </div>
      {progress !== undefined && (
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs text-slate-600">
            <span>Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <ProgressBar value={progress} />
        </div>
      )}
    </Link>
  );
}
