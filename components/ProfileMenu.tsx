"use client";

import { useState } from "react";
import Link from "next/link";
import { logout } from "@/app/login/actions";
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

export default function ProfileMenu({
  role,
  name,
  email,
}: {
  role: Role;
  name: string;
  email: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
          {initialsOf(name)}
        </span>
        <span className="hidden text-right sm:block">
          <span className="block text-sm font-medium text-slate-700">{name}</span>
          <span className="block text-xs text-slate-500">{email}</span>
        </span>
        <span aria-hidden className="text-xs text-slate-400">▾</span>
      </button>

      {open && (
        <>
          <button
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-30 cursor-default"
          />
          <div className="absolute right-0 z-40 mt-2 w-60 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
            <div className="border-b border-slate-100 px-4 py-3">
              <p className="text-sm font-medium text-slate-700">{name}</p>
              <p className="text-xs text-slate-500">{email}</p>
              <p className="mt-1 text-xs capitalize text-slate-400">{role} account</p>
            </div>
            <Link
              href={`/${role}/profile`}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              👤 Profile &amp; account settings
            </Link>
            <form action={logout} className="border-t border-slate-100">
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                ↩️ Log out
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
