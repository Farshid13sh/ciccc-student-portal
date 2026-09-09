"use client";

import { useFormState } from "react-dom";
import { login } from "./actions";

const demoAccounts: { email: string; label: string; blurb: string }[] = [
  { email: "maya@brightpath.dev", label: "Student", blurb: "Browse courses, track progress, view deadlines" },
  { email: "sofia@brightpath.dev", label: "Instructor", blurb: "Manage courses, students, attendance" },
  { email: "admin@brightpath.dev", label: "Admin", blurb: "Oversee users, payments, and platform activity" },
];

const DEMO_PASSWORD = "brightpath123";

export default function Login() {
  const [state, formAction] = useFormState(login, undefined);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md">
        <h1 className="text-center text-2xl font-bold text-brand-700">BrightPath</h1>
        <p className="mt-1 text-center text-sm text-slate-500">Sign in to your account</p>

        <form action={formAction} className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
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

        <div className="mt-6">
          <p className="text-center text-xs font-medium uppercase tracking-wide text-slate-400">
            Demo accounts &middot; password: {DEMO_PASSWORD}
          </p>
          <div className="mt-3 space-y-2">
            {demoAccounts.map((account) => (
              <form key={account.email} action={formAction}>
                <input type="hidden" name="email" value={account.email} />
                <input type="hidden" name="password" value={DEMO_PASSWORD} />
                <button
                  type="submit"
                  className="block w-full rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-brand-500 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  <p className="font-semibold">{account.label} portal</p>
                  <p className="mt-0.5 text-sm text-slate-500">{account.blurb}</p>
                </button>
              </form>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
