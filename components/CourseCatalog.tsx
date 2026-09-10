"use client";

import { useMemo, useState } from "react";
import type { Program } from "@/lib/types";
import CourseCard from "./CourseCard";

export default function CourseCatalog({
  programs,
  enrolledIds,
  progressByProgram,
}: {
  programs: Program[];
  enrolledIds: string[];
  progressByProgram: Record<string, number>;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const categories = useMemo(() => ["All", ...Array.from(new Set(programs.map((p) => p.category)))], [programs]);
  const enrolledSet = useMemo(() => new Set(enrolledIds), [enrolledIds]);

  const filtered = programs.filter((p) => {
    const matchesCategory = category === "All" || p.category === category;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q || p.title.toLowerCase().includes(q) || p.code.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block max-w-sm flex-1">
          <span className="sr-only">Search programs</span>
          <span aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search programs..."
            className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          />
        </label>
        <p className="text-sm text-slate-500">
          {filtered.length} program{filtered.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
              category === c ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-sm text-slate-500">No programs match your search.</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (
            <CourseCard
              key={p.id}
              program={p}
              enrolled={enrolledSet.has(p.id)}
              progress={progressByProgram[p.id]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
