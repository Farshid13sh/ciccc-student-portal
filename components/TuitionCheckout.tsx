"use client";

import { useState } from "react";
import type { Program } from "@/lib/types";

export default function TuitionCheckout({ program }: { program: Program }) {
  const [status, setStatus] = useState<"form" | "paid">("form");
  const total = program.applicationFee + program.materialsFee + program.tuitionDomestic;
  const dueNow = program.depositDue ?? total;
  const remaining = total - dueNow;

  if (status === "paid") {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-sm font-semibold text-emerald-800">✓ Payment received (demo)</p>
        <p className="mt-1 text-sm text-emerald-700">
          You're enrolled in {program.title}. A confirmation would normally be emailed to you —
          this is a demo, so refreshing the page resets it.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-800">Enroll in {program.title}</h3>
      <p className="mt-1 text-xs text-slate-500">
        {program.code} · {program.duration} · {program.format}
      </p>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-slate-500">Application fee</dt>
          <dd className="font-medium">${program.applicationFee.toLocaleString()}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Materials fee</dt>
          <dd className="font-medium">${program.materialsFee.toLocaleString()}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Tuition (domestic)</dt>
          <dd className="font-medium">${program.tuitionDomestic.toLocaleString()}</dd>
        </div>
        <div className="flex justify-between border-t border-slate-100 pt-2 font-semibold text-slate-800">
          <dt>Program total</dt>
          <dd>${total.toLocaleString()}</dd>
        </div>
      </dl>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setStatus("paid");
        }}
        className="mt-5 space-y-3 border-t border-slate-100 pt-4"
      >
        <p className="text-xs text-slate-500">
          Due today {program.depositDue ? "(deposit)" : "(paid in full)"}:{" "}
          <span className="font-semibold text-slate-800">${dueNow.toLocaleString()}</span>
          {program.depositDue && remaining > 0 && (
            <> · remaining ${remaining.toLocaleString()} due before the program start date</>
          )}
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            required
            placeholder="Card number"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm sm:col-span-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          />
          <input
            required
            placeholder="MM / YY"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          />
          <input
            required
            placeholder="CVC"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          />
        </div>
        <p className="text-[11px] text-slate-400">Demo checkout — no real payment is processed.</p>
        <button
          type="submit"
          className="w-full rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          Pay ${dueNow.toLocaleString()} now
        </button>
      </form>
    </div>
  );
}
