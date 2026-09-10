import { redirect } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import { getSession } from "@/lib/auth";
import { attendance } from "@/lib/data";

const statusStyle: Record<string, string> = {
  present: "bg-emerald-100 text-emerald-700",
  late: "bg-amber-100 text-amber-700",
  absent: "bg-red-100 text-red-700",
  excused: "bg-slate-100 text-slate-600",
};

export default async function InstructorAttendancePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <DashboardShell
      role="instructor"
      heading="Attendance"
      subheading="Recent session attendance across your programs"
      user={{ name: session.name, email: session.email }}
    >
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th scope="col" className="px-5 py-3 font-medium">Date</th>
              <th scope="col" className="px-5 py-3 font-medium">Course</th>
              <th scope="col" className="px-5 py-3 font-medium">Student</th>
              <th scope="col" className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {attendance.map((a) => (
              <tr key={a.id} className="hover:bg-slate-50">
                <td className="px-5 py-3 text-slate-600">{a.date}</td>
                <td className="px-5 py-3">
                  <span className="text-xs font-semibold text-brand-600">{a.course}</span>
                </td>
                <td className="px-5 py-3 font-medium">{a.student}</td>
                <td className="px-5 py-3">
                  <span className={`rounded px-2 py-0.5 text-xs font-semibold capitalize ${statusStyle[a.status]}`}>
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
