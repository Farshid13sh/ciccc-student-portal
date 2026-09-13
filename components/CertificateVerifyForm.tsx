"use client";

import { useState, type FormEvent } from "react";

interface VerifyResult {
  valid: boolean;
  student?: string;
  program?: string;
  issuedDate?: string;
  verificationId?: string;
}

export default function CertificateVerifyForm() {
  const [id, setId] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [result, setResult] = useState<VerifyResult | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!id.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch(`/api/certificates/verify/${encodeURIComponent(id.trim())}`);
      const data: VerifyResult = await res.json();
      setResult(data);
    } catch {
      setResult({ valid: false });
    } finally {
      setStatus("done");
    }
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <label htmlFor="verification-id" className="sr-only">
          Certificate verification ID
        </label>
        <input
          id="verification-id"
          type="text"
          required
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="e.g. CICCC-CP120-88213"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-60"
        >
          {status === "loading" ? "Checking…" : "Verify"}
        </button>
      </form>

      {status === "done" && result && (
        <div
          role="status"
          className={`mt-4 rounded-xl border p-4 text-left text-sm ${
            result.valid ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {result.valid ? (
            <>
              <p className="font-semibold">✓ Valid certificate</p>
              <p className="mt-1">
                <span className="font-medium">{result.student}</span> completed{" "}
                <span className="font-medium">{result.program}</span>
              </p>
              <p className="mt-1 text-xs text-emerald-700">
                Issued {result.issuedDate} · ID {result.verificationId}
              </p>
            </>
          ) : (
            <p className="font-semibold">No certificate found with that ID.</p>
          )}
        </div>
      )}

      <p className="mt-3 text-center text-xs text-slate-400">
        This form calls a real API route (<code>/api/certificates/verify/[id]</code>) — no
        account needed.
      </p>
    </div>
  );
}
