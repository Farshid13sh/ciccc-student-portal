"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { signup } from "@/app/signup/actions";
import type { Role } from "@/lib/types";
import { roleMeta } from "@/lib/roles";

const PROGRAMS = [
  "Web Development",
  "Computer Science",
  "Design",
  "Education",
  "Other",
];

export default function SignupForm({ role }: { role: Role }) {
  const [state, formAction] = useFormState(signup, undefined);
  const meta = roleMeta[role];

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md">
        <Link href={`/login/${role}`} className="text-xs font-medium text-slate-500 hover:text-brand-600">
          ← Back to sign in
        </Link>

        <h1 className="mt-3 text-center text-2xl font-bold text-brand-700">CICCC</h1>
        <p className="mt-1 text-center text-sm text-slate-500">Create a {meta.label.toLowerCase()} account</p>

        <form
          action={formAction}
          className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <input type="hidden" name="role" value={role} />

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
              Full name
            </label>
            <input
              id="name" name="name" type="text" required autoComplete="name"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email" name="email" type="email" required autoComplete="email"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            />
          </div>

          {role === "student" && (
            <>
              <div>
                <label htmlFor="studentId" className="block text-sm font-medium text-slate-700">
                  Student ID
                </label>
                <input
                  id="studentId" name="studentId" type="text" required
                  placeholder="e.g. S-100987"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                />
                <p className="mt-1 text-xs text-slate-400">
                  Required for enrollment, attendance, and payment records.
                </p>
              </div>
              <div>
                <label htmlFor="program" className="block text-sm font-medium text-slate-700">
                  Program of interest
                </label>
                <select
                  id="program" name="program" defaultValue={PROGRAMS[0]}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  {PROGRAMS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {role === "instructor" && (
            <>
              <div>
                <label htmlFor="employeeId" className="block text-sm font-medium text-slate-700">
                  Employee ID
                </label>
                <input
                  id="employeeId" name="employeeId" type="text" required
                  placeholder="e.g. E-500987"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                />
                <p className="mt-1 text-xs text-slate-400">
                  Verifies you're staff before granting course-management access.
                </p>
              </div>
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-slate-700">
                  Department
                </label>
                <input
                  id="department" name="department" type="text"
                  placeholder="e.g. Computer Science & Design"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password" name="password" type="password" required minLength={8} autoComplete="new-password"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
              Confirm password
            </label>
            <input
              id="confirmPassword" name="confirmPassword" type="password" required minLength={8} autoComplete="new-password"
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
            Create account
          </button>

          <p className="text-center text-xs text-slate-400">
            This creates a real (demo-scoped) account for this session — you'll sign in with exactly
            what you enter here.
          </p>
        </form>
      </div>
    </main>
  );
}
