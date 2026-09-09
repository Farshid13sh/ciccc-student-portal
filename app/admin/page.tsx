import { redirect } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import StatCard from "@/components/StatCard";
import Badge from "@/components/Badge";
import { getSession } from "@/lib/auth";
import { payments, users } from "@/lib/data";

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
        <StatCard label="Active courses" value="12" icon="📚" />
        <StatCard label="Revenue (demo)" value={`$${revenue}`} hint="Sep 2026" icon="💰" />
        <StatCard label="Pending payments" value="1" icon="⏳" />
      </div>

      <h2 className="mt-8 text-lg font-semibold">Users</h2>
      <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th scope="col" className="px-5 py-3 font-medium">Name</th>
              <th scope="col" className="px-5 py-3 font-medium">Role</th>
              <th scope="col" className="px-5 py-3 font-medium">Joined</th>
              <th scope="col" className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50">
                <td className="px-5 py-3">
                  <p className="font-medium">{u.name}</p>
                  <p className="text-xs text-slate-500">{u.email}</p>
                </td>
                <td className="px-5 py-3 capitalize text-slate-600">{u.role}</td>
                <td className="px-5 py-3 text-slate-600">{u.joined}</td>
                <td className="px-5 py-3"><Badge label={u.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-8 text-lg font-semibold">Payments</h2>
      <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th scope="col" className="px-5 py-3 font-medium">Student</th>
              <th scope="col" className="px-5 py-3 font-medium">Course</th>
              <th scope="col" className="px-5 py-3 font-medium">Amount</th>
              <th scope="col" className="px-5 py-3 font-medium">Date</th>
              <th scope="col" className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {payments.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="px-5 py-3 font-medium">{p.student}</td>
                <td className="px-5 py-3 text-slate-600">{p.course}</td>
                <td className="px-5 py-3">${p.amount}</td>
                <td className="px-5 py-3 text-slate-600">{p.date}</td>
                <td className="px-5 py-3"><Badge label={p.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
