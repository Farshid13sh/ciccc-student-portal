import { redirect } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import Badge from "@/components/Badge";
import { getSession } from "@/lib/auth";
import { users } from "@/lib/data";

export default async function AdminUsersPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <DashboardShell
      role="admin"
      heading="Users"
      subheading="Everyone with access to the platform"
      user={{ name: session.name, email: session.email }}
    >
      <div className="flex items-center justify-between gap-3">
        <input
          type="search"
          placeholder="Search users (demo — not wired up)"
          className="w-full max-w-xs rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        />
        <button
          type="button"
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
        >
          + Invite user
        </button>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th scope="col" className="px-5 py-3 font-medium">Name</th>
              <th scope="col" className="px-5 py-3 font-medium">Role</th>
              <th scope="col" className="px-5 py-3 font-medium">Joined</th>
              <th scope="col" className="px-5 py-3 font-medium">Status</th>
              <th scope="col" className="px-5 py-3 font-medium">
                <span className="sr-only">Actions</span>
              </th>
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
                <td className="px-5 py-3 text-right">
                  <button type="button" className="text-xs font-semibold text-brand-600 hover:underline">
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
