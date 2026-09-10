import Link from "next/link";
import { redirect } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import StatCard from "@/components/StatCard";
import { getSession } from "@/lib/auth";
import { activity, payments, programs } from "@/lib/data";

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session) redirect("/login");

  const revenue = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <DashboardShell
      role="admin"
      heading="Admin dashboard"
      subheading="Platform overview — users, payments, and activity"
      user={{ name: session.name, email: session.email }}
    >
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total users" value="1,248" hint="+32 this week" icon="👥" />
        <StatCard label="Active programs" value={String(programs.filter((p) => p.status === "published").length)} icon="📚" />
        <StatCard label="Revenue (demo)" value={`$${revenue.toLocaleString()}`} hint="Sep 2026" icon="💰" />
        <StatCard label="Pending payments" value="1" icon="⏳" />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/admin/users" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-500 hover:text-brand-700">
          Manage users →
        </Link>
        <Link href="/admin/payments" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-500 hover:text-brand-700">
          View payments →
        </Link>
        <Link href="/admin/reports" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-500 hover:text-brand-700">
          Open reports →
        </Link>
      </div>

      <h2 className="mt-8 text-lg font-semibold">Recent activity</h2>
      <ul className="mt-3 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white shadow-sm">
        {activity.map((a) => (
          <li key={a.what} className="px-5 py-3 text-sm">
            <span className="font-medium">{a.who}</span>{" "}
            <span className="text-slate-600">{a.what}</span>
            <span className="float-right text-xs text-slate-400">{a.when}</span>
          </li>
        ))}
      </ul>
    </DashboardShell>
  );
}
