import Link from "next/link";
import { notFound } from "next/navigation";
import SignupForm from "@/components/SignupForm";
import { isRole, roleMeta } from "@/lib/roles";

export default function RoleSignup({ params }: { params: { role: string } }) {
  if (!isRole(params.role)) notFound();
  const role = params.role;
  const meta = roleMeta[role];

  if (!meta.allowSignup) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
        <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <h1 className="text-lg font-bold text-brand-700">Admin accounts aren't self-serve</h1>
          <p className="mt-2 text-sm text-slate-600">
            For security, admin accounts are provisioned by IT rather than created through sign-up.
            Contact an existing admin to get access.
          </p>
          <Link
            href="/login/admin"
            className="mt-4 inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
          >
            Back to admin sign in
          </Link>
        </div>
      </main>
    );
  }

  return <SignupForm role={role} />;
}
