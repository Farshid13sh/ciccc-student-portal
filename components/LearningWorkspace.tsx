"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import type { Lesson, Program } from "@/lib/types";
import ProgressBar from "./ProgressBar";

interface SubmissionRecord {
  fileName: string;
  sizeLabel: string;
  notes: string;
  submittedAt: string;
}

const PROGRESS_KEY = "bp_lesson_progress_v1";
const SUBMISSIONS_KEY = "bp_lesson_submissions_v1";

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // best-effort persistence only
  }
}

export default function LearningWorkspace({
  program,
  lessons,
  initialProgress,
}: {
  program: Program;
  lessons: Lesson[];
  initialProgress: number;
}) {
  const sorted = useMemo(() => [...lessons].sort((a, b) => a.order - b.order), [lessons]);
  const units = useMemo(() => {
    const map = new Map<string, Lesson[]>();
    for (const l of sorted) {
      map.set(l.unit, [...(map.get(l.unit) ?? []), l]);
    }
    return Array.from(map.entries());
  }, [sorted]);

  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [selectedId, setSelectedId] = useState<string>(sorted[0]?.id ?? "");
  const [submissions, setSubmissions] = useState<Record<string, SubmissionRecord>>({});
  const [loaded, setLoaded] = useState(false);

  // form state for the currently-open assignment
  const [notes, setNotes] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);

  useEffect(() => {
    const allProgress = readJSON<Record<string, string[]>>(PROGRESS_KEY, {});
    let ids = allProgress[program.id];
    if (!ids) {
      // Seed a believable starting point from the enrollment's recorded progress
      const seedCount = Math.round((sorted.length * initialProgress) / 100);
      ids = sorted.slice(0, seedCount).map((l) => l.id);
      allProgress[program.id] = ids;
      writeJSON(PROGRESS_KEY, allProgress);
    }
    setCompleted(new Set(ids));
    const firstIncomplete = sorted.find((l) => !ids!.includes(l.id));
    setSelectedId(firstIncomplete?.id ?? sorted[sorted.length - 1]?.id ?? "");
    setSubmissions(readJSON<Record<string, SubmissionRecord>>(SUBMISSIONS_KEY, {}));
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [program.id]);

  useEffect(() => {
    if (!loaded) return;
    const allProgress = readJSON<Record<string, string[]>>(PROGRESS_KEY, {});
    allProgress[program.id] = Array.from(completed);
    writeJSON(PROGRESS_KEY, allProgress);
  }, [completed, loaded, program.id]);

  const selected = sorted.find((l) => l.id === selectedId) ?? sorted[0];
  const selectedIndex = sorted.findIndex((l) => l.id === selected?.id);
  const pct = sorted.length ? Math.round((completed.size / sorted.length) * 100) : 0;

  function selectLesson(l: Lesson) {
    setSelectedId(l.id);
    setNotes("");
    setFileName("");
    setFileSize(0);
  }

  function toggleComplete(id: string) {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function goTo(offset: number) {
    const next = sorted[selectedIndex + offset];
    if (next) selectLesson(next);
  }

  function handleSubmitAssignment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selected || !fileName) return;
    const record: SubmissionRecord = {
      fileName,
      sizeLabel: formatSize(fileSize),
      notes: notes.trim(),
      submittedAt: new Date().toLocaleString(),
    };
    const next = { ...submissions, [selected.id]: record };
    setSubmissions(next);
    writeJSON(SUBMISSIONS_KEY, next);
    setCompleted((prev) => new Set(prev).add(selected.id));
  }

  if (!selected) {
    return <p className="text-sm text-slate-500">This program doesn't have any lessons yet.</p>;
  }

  const submission = submissions[selected.id];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{selected.unit}</p>
            <h2 className="mt-1 text-lg font-semibold text-slate-900">{selected.title}</h2>
            <p className="mt-0.5 text-xs text-slate-500">
              {selected.type === "video" ? `${selected.durationMin} min video` : `Assignment · est. ${selected.durationMin} min`}
            </p>
          </div>
          {completed.has(selected.id) && (
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
              ✓ Completed
            </span>
          )}
        </div>

        {selected.type === "video" ? (
          <div className="mt-4">
            <div className="flex aspect-video items-center justify-center rounded-xl bg-slate-900">
              <button
                type="button"
                aria-label="Play video"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-2xl text-white hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                ▶
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-slate-400">
              Demo player — no real video file is stored or streamed.
            </p>
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            {submission ? (
              <div>
                <p className="text-sm font-medium text-emerald-700">✓ Submitted</p>
                <p className="mt-1 text-sm text-slate-700">
                  {submission.fileName} · {submission.sizeLabel} · {submission.submittedAt}
                </p>
                {submission.notes && <p className="mt-1 text-xs text-slate-600">"{submission.notes}"</p>}
              </div>
            ) : (
              <form onSubmit={handleSubmitAssignment} className="space-y-3">
                <div>
                  <label htmlFor="assign-file" className="block text-xs font-medium text-slate-600">
                    Upload your work
                  </label>
                  <input
                    id="assign-file"
                    type="file"
                    required
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setFileName(file?.name ?? "");
                      setFileSize(file?.size ?? 0);
                    }}
                    className="mt-1 w-full text-sm text-slate-600"
                  />
                  <p className="mt-1 text-xs text-slate-400">
                    Demo only — the file stays on your device; we save its name and size.
                  </p>
                </div>
                <div>
                  <label htmlFor="assign-notes" className="block text-xs font-medium text-slate-600">
                    Notes for your instructor (optional)
                  </label>
                  <textarea
                    id="assign-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  Submit assignment
                </button>
              </form>
            )}
          </div>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => goTo(-1)}
            disabled={selectedIndex <= 0}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Previous
          </button>
          <button
            type="button"
            onClick={() => toggleComplete(selected.id)}
            className="rounded-lg bg-brand-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            {completed.has(selected.id) ? "Mark incomplete" : "Mark complete"}
          </button>
          <button
            type="button"
            onClick={() => goTo(1)}
            disabled={selectedIndex >= sorted.length - 1}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      </section>

      <aside aria-label="Program curriculum" className="h-fit rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-4 py-3">
          <p className="text-sm font-semibold text-slate-800">{program.title}</p>
          <p className="mt-0.5 text-xs text-slate-500">{program.code} · {sorted.length} lessons</p>
          <div className="mt-2">
            <div className="mb-1 flex justify-between text-xs text-slate-600">
              <span>Your progress</span>
              <span className="font-medium">{pct}%</span>
            </div>
            <ProgressBar value={pct} />
          </div>
        </div>
        <div className="max-h-[28rem] overflow-y-auto">
          {units.map(([unit, unitLessons]) => (
            <div key={unit}>
              <p className="bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {unit}
              </p>
              <ul className="divide-y divide-slate-100">
                {unitLessons.map((l) => {
                  const done = completed.has(l.id);
                  const active = l.id === selected.id;
                  return (
                    <li key={l.id}>
                      <button
                        type="button"
                        onClick={() => selectLesson(l)}
                        aria-current={active ? "true" : undefined}
                        className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                          active ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span aria-hidden className={done ? "text-emerald-600" : "text-slate-300"}>
                          {done ? "✓" : l.type === "video" ? "▶" : "📝"}
                        </span>
                        <span className={`min-w-0 flex-1 truncate ${done ? "text-slate-400 line-through" : ""}`}>
                          {l.title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-100 px-4 py-3">
          <Link href="/student/learn" className="text-xs font-medium text-brand-600 hover:underline">
            ← Back to My Learning
          </Link>
        </div>
      </aside>
    </div>
  );
}
