"use client";

import { useState } from "react";
import type { Notification } from "@/lib/types";

export default function NotificationBell({ initial }: { initial: Notification[] }) {
  const [items, setItems] = useState(initial);
  const [open, setOpen] = useState(false);
  const unread = items.filter((i) => !i.read).length;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
        className="relative rounded-full p-2 text-lg hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        <span aria-hidden>🔔</span>
        {unread > 0 && (
          <span
            aria-hidden
            className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white"
          >
            {unread}
          </span>
        )}
      </button>

      {open && (
        <>
          <button
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-30 cursor-default"
          />
          <div className="absolute right-0 z-40 mt-2 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <p className="text-sm font-semibold">Notifications</p>
              <button
                type="button"
                onClick={() => setItems((prev) => prev.map((i) => ({ ...i, read: true })))}
                className="text-xs font-medium text-brand-600 hover:underline"
              >
                Mark all read
              </button>
            </div>
            <ul className="max-h-80 divide-y divide-slate-100 overflow-y-auto">
              {items.map((n) => (
                <li key={n.id} className={`flex gap-3 px-4 py-3 text-sm ${n.read ? "" : "bg-brand-50/60"}`}>
                  <span aria-hidden className="text-base">{n.icon}</span>
                  <div>
                    <p className="font-medium text-slate-800">{n.title}</p>
                    <p className="text-xs text-slate-500">{n.body}</p>
                    <p className="mt-1 text-[11px] text-slate-400">{n.when}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
