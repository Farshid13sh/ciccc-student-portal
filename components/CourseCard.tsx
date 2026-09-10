import Link from "next/link";
import type { Program } from "@/lib/types";
import ProgressBar from "./ProgressBar";
import Badge from "./Badge";

export default function CourseCard({
  program,
  enrolled,
  progress,
}: {
  program: Program;
  enrolled?: boolean;
  progress?: number;
}) {
  const cta = enrolled
    ? { href: `/student/learn/${program.id}`, label: "Continue Learning →" }
    : { href: `/student/account?tab=billing&program=${program.id}`, label: "Enroll Now →" };

  return (
    <div className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-500 hover:shadow-md">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">{program.category}</span>
        {program.badge && <Badge label={program.badge} />}
      </div>
      <h3 className="mt-2 text-lg font-semibold leading-snug text-slate-900 group-hover:text-brand-700">
        {program.title}
      </h3>
      <p className="mt-1 line-clamp-2 text-sm text-slate-600">{program.description}</p>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
        <span>{program.code}</span>
        <span>{program.duration}</span>
        <span>★ {program.rating}</span>
        <span>{program.students} students</span>
      </div>

      {enrolled && progress !== undefined ? (
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs text-slate-600">
            <span>Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <ProgressBar value={progress} />
        </div>
      ) : (
        <p className="mt-4 text-sm font-semibold text-slate-800">
          From ${program.tuitionDomestic.toLocaleString()} <span className="font-normal text-slate-400">domestic tuition</span>
        </p>
      )}

      <Link
        href={cta.href}
        className="mt-4 inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        {cta.label}
      </Link>
    </div>
  );
}
