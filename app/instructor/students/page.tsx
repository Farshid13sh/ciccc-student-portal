import { redirect } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import Badge from "@/components/Badge";
import { getSession } from "@/lib/auth";
import { enrollments, users } from "@/lib/data";

export default async function InstructorStudentsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const students = users.filter((u) => u.role === "student");

  return (
    <DashboardShell
      role="instructor"
      heading="Students"
      subheading="Everyone enrolled across your programs"
      user={{ name: session.name, email: session.email }}
    >
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th scope="col" className="px-5 py-3 font-medium">Name</th>
              <th scope="col" className="px-5 py-3 font-medium">Joined</th>
              <th scope="col" className="px-5 py-3 font-medium">Status</th>
              <th scope="col" className="px-5 py-3 font-medium">Progress</th>
              <th scope="col" className="px-5 py-3 font-medium">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((s) => {
              const enrollment = s.name === "Maya Chen" ? enrollments[0] : undefined;
              return (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <p className="font-medium">{s.name}</p>
                    <p className="text-xs text-slate-500">{s.email}</p>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{s.joined}</td>
                  <td className="px-5 py-3"><Badge label={s.status} /></td>
                  <td className="px-5 py-3 text-slate-600">
                    {enrollment ? `${enrollment.progress}%` : "—"}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      type="button"
                      className="text-xs font-semibold text-brand-600 hover:underline"
                    >
                      Message
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
