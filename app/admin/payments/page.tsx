import { redirect } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import Badge from "@/components/Badge";
import { getSession } from "@/lib/auth";
import { payments } from "@/lib/data";

export default async function AdminPaymentsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const total = payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);
  const pending = payments.filter((p) => p.status === "pending").length;
  const failed = payments.filter((p) => p.status === "failed").length;

  return (
    <DashboardShell
      role="admin"
      heading="Payments"
      subheading="All course payments across the platform"
      user={{ name: session.name, email: session.email }}
    >
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-slate-500">Total collected</p>
          <p className="mt-1 text-2xl font-bold text-brand-600">${total}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-slate-500">Pending</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">{pending}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-slate-500">Failed</p>
          <p className="mt-1 text-2xl font-bold text-red-600">{failed}</p>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
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
