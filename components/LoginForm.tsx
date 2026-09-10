"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { login } from "@/app/login/actions";
import GoogleAuthModal from "./GoogleAuthModal";
import type { Role } from "@/lib/types";
import { roleMeta } from "@/lib/roles";

export default function LoginForm({
  role,
  demoPersona,
  allowSignup,
  createdEmail,
}: {
  role: Role;
  demoPersona: { name: string; email: string };
  allowSignup: boolean;
  createdEmail?: string;
}) {
  const [state, formAction] = useFormState(login, undefined);
  const meta = roleMeta[role];

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md">
        <Link href="/login" className="text-xs font-medium text-slate-500 hover:text-brand-600">
          ← Choose a different portal
        </Link>

        <h1 className="mt-3 text-center text-2xl font-bold text-brand-700">CICCC</h1>
        <p className="mt-1 text-center text-sm text-slate-500">Sign in — {meta.label} portal</p>

        {createdEmail && (
          <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-center text-sm text-emerald-700">
            Account created for <strong>{createdEmail}</strong> — sign in below.
          </p>
        )}

        <div className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <GoogleAuthModal role={role} persona={demoPersona} />

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            or
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <form action={formAction} className="space-y-4">
            <input type="hidden" name="role" value={role} />
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                defaultValue={createdEmail}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              />
            </div>

            {state?.error && (
              <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              Sign in
            </button>
          </form>

          <p className="text-center text-xs text-slate-400">
            Demo tip: this portal only accepts <strong>{demoPersona.email}</strong> · password{" "}
            <strong>ciccc123</strong>
          </p>
        </div>

        {allowSignup && (
          <p className="mt-4 text-center text-sm text-slate-600">
            New here?{" "}
            <Link href={`/signup/${role}`} className="font-medium text-brand-600 hover:underline">
              Create a {meta.label.toLowerCase()} account
            </Link>
          </p>
        )}
      </div>
    </main>
  );
}
