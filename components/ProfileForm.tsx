"use client";

import { useFormState } from "react-dom";
import { updateProfile } from "@/app/profile/actions";
import type { Role } from "@/lib/types";

export default function ProfileForm({
  role,
  name,
  email,
  studentId,
  program,
  employeeId,
  department,
}: {
  role: Role;
  name: string;
  email: string;
  studentId?: string;
  program?: string;
  employeeId?: string;
  department?: string;
}) {
  const [state, formAction] = useFormState(updateProfile, undefined);

  return (
    <form action={formAction} className="max-w-xl space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700">
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={name}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          disabled
          className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500"
        />
        <p className="mt-1 text-xs text-slate-400">
          Your email is how you sign in, so it can't be changed here in the demo.
        </p>
      </div>

      {role === "student" && (
        <>
          <div>
            <label htmlFor="studentId" className="block text-sm font-medium text-slate-700">
              Student ID
            </label>
            <input
              id="studentId"
              type="text"
              value={studentId ?? "—"}
              disabled
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500"
            />
            <p className="mt-1 text-xs text-slate-400">Issued by the school — contact an admin to change it.</p>
          </div>
          <div>
            <label htmlFor="program" className="block text-sm font-medium text-slate-700">
              Program
            </label>
            <input
              id="program"
              name="program"
              type="text"
              defaultValue={program ?? ""}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            />
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
              id="employeeId"
              type="text"
              value={employeeId ?? "—"}
              disabled
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500"
            />
            <p className="mt-1 text-xs text-slate-400">Issued by HR — contact an admin to change it.</p>
          </div>
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-slate-700">
              Department
            </label>
            <input
              id="department"
              name="department"
              type="text"
              defaultValue={department ?? ""}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            />
          </div>
        </>
      )}

      {state?.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}
      {state?.success && (
        <p role="status" className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          {state.success}
        </p>
      )}

      <button
        type="submit"
        className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        Save changes
      </button>
    </form>
  );
}
