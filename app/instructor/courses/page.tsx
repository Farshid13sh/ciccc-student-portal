import Link from "next/link";
import { redirect } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import Badge from "@/components/Badge";
import { getSession } from "@/lib/auth";
import { programs } from "@/lib/data";

export default async function InstructorCoursesPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <DashboardShell
      role="instructor"
      heading="Programs"
      subheading="Manage the programs you teach"
      user={{ name: session.name, email: session.email }}
    >
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th scope="col" className="px-5 py-3 font-medium">Program</th>
              <th scope="col" className="px-5 py-3 font-medium">Category</th>
              <th scope="col" className="px-5 py-3 font-medium">Students</th>
              <th scope="col" className="px-5 py-3 font-medium">Rating</th>
              <th scope="col" className="px-5 py-3 font-medium">Status</th>
              <th scope="col" className="px-5 py-3 font-medium">
                <span className="sr-only">Manage</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {programs.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="px-5 py-3">
                  <span className="mr-2 text-xs font-semibold text-brand-600">{p.code}</span>
                  {p.title}
                </td>
                <td className="px-5 py-3 text-slate-600">{p.category}</td>
                <td className="px-5 py-3">{p.students}</td>
                <td className="px-5 py-3">★ {p.rating}</td>
                <td className="px-5 py-3"><Badge label={p.status} /></td>
                <td className="px-5 py-3 text-right">
                  <Link href={`/instructor/courses/${p.id}`} className="text-xs font-semibold text-brand-600 hover:underline">
                    Manage →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
