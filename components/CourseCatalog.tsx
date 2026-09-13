"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  // Seeded with the server-rendered list so the page has real content on
  // first paint (and still works with JS disabled); every search/filter
  // change after that goes over the network to GET /api/programs.
  const [results, setResults] = useState<Program[]>(programs);
  const [loading, setLoading] = useState(false);
  const isFirstRun = useRef(true);

  const categories = useMemo(() => ["All", ...Array.from(new Set(programs.map((p) => p.category)))], [programs]);
  const enrolledSet = useMemo(() => new Set(enrolledIds), [enrolledIds]);

  useEffect(() => {
    // Skip the redundant fetch on mount — the server already sent this data.
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (query.trim()) params.set("q", query.trim());
        if (category !== "All") params.set("category", category);

        const res = await fetch(`/api/programs?${params.toString()}`, { signal: controller.signal });
        if (!res.ok) throw new Error("Request failed");
        const data: { programs: Program[] } = await res.json();
        setResults(data.programs);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          // Network hiccup — leave the last good results on screen rather than blanking the page.
        }
      } finally {
        setLoading(false);
      }
    }, 250); // debounce so we're not firing a request per keystroke

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [query, category]);

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
          {loading ? "Searching…" : `${results.length} program${results.length === 1 ? "" : "s"}`}
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

      {results.length === 0 && !loading ? (
        <p className="mt-8 text-sm text-slate-500">No programs match your search.</p>
      ) : (
        <div className={`mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 transition-opacity ${loading ? "opacity-50" : ""}`}>
          {results.map((p) => (
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
