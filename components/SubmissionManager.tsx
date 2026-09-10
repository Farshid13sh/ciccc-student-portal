"use client";

import { useEffect, useState, type FormEvent } from "react";
import { courses } from "@/lib/data";

interface Submission {
  id: string;
  courseCode: string;
  title: string;
  fileName: string;
  sizeLabel: string;
  notes: string;
  submittedAt: string;
  status: "submitted";
}

const STORAGE_KEY = "bp_student_submissions_v1";

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function SubmissionManager() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [courseCode, setCourseCode] = useState(courses[0]?.code ?? "");
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setSubmissions(JSON.parse(raw));
    } catch {
      // localStorage unavailable — start empty, still fully usable this session
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    } catch {
      // best-effort persistence only
    }
  }, [submissions, loaded]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim() || !fileName) return;

    const entry: Submission = {
      id: `s-${Date.now()}`,
      courseCode,
      title: title.trim(),
      fileName,
      sizeLabel: formatSize(fileSize),
      notes: notes.trim(),
      submittedAt: new Date().toLocaleString(),
      status: "submitted",
    };
    setSubmissions((prev) => [entry, ...prev]);
    setTitle("");
    setNotes("");
    setFileName("");
    setFileSize(0);
    e.currentTarget.reset();
  }

  function remove(id: string) {
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <section
        aria-labelledby="submit-heading"
        className="lg:col-span-1 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <h2 id="submit-heading" className="text-sm font-semibold">
          Submit a project
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label htmlFor="sub-course" className="block text-xs font-medium text-slate-600">
              Course
            </label>
            <select
              id="sub-course"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.code}>
                  {c.code} · {c.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sub-title" className="block text-xs font-medium text-slate-600">
              Assignment / project title
            </label>
            <input
              id="sub-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Capstone: portfolio site"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            />
          </div>

          <div>
            <label htmlFor="sub-file" className="block text-xs font-medium text-slate-600">
              File
            </label>
            <input
              id="sub-file"
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
            <label htmlFor="sub-notes" className="block text-xs font-medium text-slate-600">
              Notes for your instructor (optional)
            </label>
            <textarea
              id="sub-notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </section>

      <section
        aria-labelledby="submissions-heading"
        className="lg:col-span-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
      >
        <h2 id="submissions-heading" className="border-b border-slate-200 px-5 py-3 text-sm font-semibold">
          Your submissions ({submissions.length})
        </h2>
        {submissions.length === 0 ? (
          <p className="px-5 py-6 text-sm text-slate-500">No submissions yet.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {submissions.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-3 px-5 py-3 text-sm">
                <div>
                  <p className="font-medium">
                    <span className="mr-2 text-xs font-semibold text-brand-600">{s.courseCode}</span>
                    {s.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {s.fileName} · {s.sizeLabel} · {s.submittedAt}
                  </p>
                  {s.notes && <p className="mt-1 text-xs text-slate-600">"{s.notes}"</p>}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                    Submitted
                  </span>
                  <button
                    type="button"
                    onClick={() => remove(s.id)}
                    aria-label={`Remove ${s.title}`}
                    className="rounded px-2 py-1 text-xs font-medium text-slate-400 hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
