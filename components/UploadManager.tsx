"use client";

import { useEffect, useState, type FormEvent } from "react";
import { courses } from "@/lib/data";

interface VideoUpload {
  id: string;
  courseCode: string;
  title: string;
  fileName: string;
  sizeLabel: string;
  uploadedAt: string;
}

const STORAGE_KEY = "bp_instructor_uploads_v1";

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadManager({ initialCourseCode }: { initialCourseCode?: string } = {}) {
  const [uploads, setUploads] = useState<VideoUpload[]>([]);
  const [title, setTitle] = useState("");
  const [courseCode, setCourseCode] = useState(initialCourseCode ?? courses[0]?.code ?? "");
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUploads(JSON.parse(raw));
    } catch {
      // localStorage unavailable — start empty, still fully usable this session
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(uploads));
    } catch {
      // best-effort persistence only
    }
  }, [uploads, loaded]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim() || !fileName) return;

    const entry: VideoUpload = {
      id: `u-${Date.now()}`,
      courseCode,
      title: title.trim(),
      fileName,
      sizeLabel: formatSize(fileSize),
      uploadedAt: new Date().toLocaleString(),
    };
    setUploads((prev) => [entry, ...prev]);
    setTitle("");
    setFileName("");
    setFileSize(0);
    e.currentTarget.reset();
  }

  function remove(id: string) {
    setUploads((prev) => prev.filter((u) => u.id !== id));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <section
        aria-labelledby="upload-heading"
        className="lg:col-span-1 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <h2 id="upload-heading" className="text-sm font-semibold">
          Upload a lesson video
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label htmlFor="course" className="block text-xs font-medium text-slate-600">
              Course
            </label>
            <select
              id="course"
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
            <label htmlFor="video-title" className="block text-xs font-medium text-slate-600">
              Lesson title
            </label>
            <input
              id="video-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Lesson 7: Async JavaScript"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            />
          </div>

          <div>
            <label htmlFor="video-file" className="block text-xs font-medium text-slate-600">
              Video file
            </label>
            <input
              id="video-file"
              type="file"
              accept="video/*"
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

          <button
            type="submit"
            className="w-full rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            Upload video
          </button>
        </form>
      </section>

      <section
        aria-labelledby="uploaded-heading"
        className="lg:col-span-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
      >
        <h2 id="uploaded-heading" className="border-b border-slate-200 px-5 py-3 text-sm font-semibold">
          Uploaded videos ({uploads.length})
        </h2>
        {uploads.length === 0 ? (
          <p className="px-5 py-6 text-sm text-slate-500">No videos uploaded yet.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {uploads.map((u) => (
              <li key={u.id} className="flex items-center justify-between gap-3 px-5 py-3 text-sm">
                <div>
                  <p className="font-medium">
                    <span className="mr-2 text-xs font-semibold text-brand-600">{u.courseCode}</span>
                    {u.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {u.fileName} · {u.sizeLabel} · {u.uploadedAt}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(u.id)}
                  aria-label={`Remove ${u.title}`}
                  className="rounded px-2 py-1 text-xs font-medium text-slate-400 hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
