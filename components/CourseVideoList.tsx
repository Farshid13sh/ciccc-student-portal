"use client";

import { useEffect, useState } from "react";
import VideoPlayerModal from "./VideoPlayerModal";

interface VideoUpload {
  id: string;
  courseCode: string;
  title: string;
  fileName: string;
  sizeLabel: string;
  uploadedAt: string;
}

const STORAGE_KEY = "bp_instructor_uploads_v1";

export default function CourseVideoList({ courseCode }: { courseCode: string }) {
  const [uploads, setUploads] = useState<VideoUpload[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const all: VideoUpload[] = JSON.parse(raw);
        setUploads(all.filter((u) => u.courseCode === courseCode));
      }
    } catch {
      // localStorage unavailable — show the empty state below
    }
  }, [courseCode]);

  if (uploads.length === 0) {
    return (
      <p className="px-5 py-6 text-sm text-slate-500">
        No videos uploaded for this course yet — head to{" "}
        <a href={`/instructor/uploads?course=${courseCode}`} className="font-medium text-brand-600 hover:underline">
          Uploads
        </a>{" "}
        to add one.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-slate-100">
      {uploads.map((u) => (
        <li key={u.id} className="flex items-center justify-between gap-3 px-5 py-3 text-sm">
          <div>
            <p className="font-medium">{u.title}</p>
            <p className="mt-0.5 text-xs text-slate-500">
              {u.fileName} · {u.sizeLabel} · {u.uploadedAt}
            </p>
          </div>
          <VideoPlayerModal label="▶ Preview" title={u.title} meta={`${u.fileName} · ${u.sizeLabel}`} />
        </li>
      ))}
    </ul>
  );
}
