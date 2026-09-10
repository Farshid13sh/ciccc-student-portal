import Link from "next/link";
import { ROLES, roleMeta } from "@/lib/roles";

export default function RoleSelect() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-center text-2xl font-bold text-brand-700">CICCC</h1>
        <p className="mt-1 text-center text-sm text-slate-500">
          Who's signing in? Pick a portal to continue.
        </p>
        <div className="mt-6 space-y-3">
          {ROLES.map((role) => {
            const meta = roleMeta[role];
            return (
              <Link
                key={role}
                href={`/login/${role}`}
                className="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-500 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <p className="font-semibold">{meta.label} portal</p>
                <p className="mt-0.5 text-sm text-slate-500">{meta.blurb}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
