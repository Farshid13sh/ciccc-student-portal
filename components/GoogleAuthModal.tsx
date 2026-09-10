"use client";

import { useState } from "react";
import { googleLogin } from "@/app/login/actions";
import type { Role } from "@/lib/types";

function initialsOf(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function GoogleAuthModal({
  role,
  persona,
}: {
  role: Role;
  persona: { name: string; email: string };
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        <span
          aria-hidden
          className="flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
          style={{
            background:
              "conic-gradient(from 0deg, #4285F4 0deg 90deg, #EA4335 90deg 180deg, #FBBC05 180deg 270deg, #34A853 270deg 360deg)",
          }}
        >
          G
        </span>
        Continue with Google
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="google-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p id="google-modal-title" className="text-base font-medium text-slate-800">
                  Choose an account
                </p>
                <p className="mt-0.5 text-xs text-slate-500">to continue to BrightPath (demo)</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                ✕
              </button>
            </div>

            <form action={googleLogin} className="mt-4">
              <input type="hidden" name="role" value={role} />
              <button
                type="submit"
                className="flex w-full items-center gap-3 rounded-lg border border-slate-200 p-3 text-left hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
                  {initialsOf(persona.name)}
                </span>
                <span>
                  <p className="text-sm font-medium text-slate-800">{persona.name}</p>
                  <p className="text-xs text-slate-500">{persona.email}</p>
                </span>
              </button>
            </form>

            <p className="mt-4 text-center text-[11px] text-slate-400">
              Demo only — no real Google account is used.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
