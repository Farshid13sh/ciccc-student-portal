"use client";

import { useState } from "react";

export default function VideoPlayerModal({
  label,
  title,
  meta,
}: {
  label: string;
  title: string;
  meta?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        {label}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4"
        >
          <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between">
              <p id="video-modal-title" className="font-semibold text-slate-800">
                {title}
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 flex aspect-video items-center justify-center rounded-xl bg-slate-900">
              <button
                type="button"
                aria-label="Play video"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-2xl text-white hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                ▶
              </button>
            </div>

            {meta && <p className="mt-2 text-xs text-slate-500">{meta}</p>}
            <p className="mt-3 text-center text-[11px] text-slate-400">
              Demo player — no real video file is stored or streamed.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
