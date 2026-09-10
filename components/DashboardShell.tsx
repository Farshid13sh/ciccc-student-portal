import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import type { Role } from "@/lib/types";

const portalLabel: Record<Role, string> = {
  student: "Student Portal",
  instructor: "Instructor Portal",
  admin: "Admin Portal",
};

export default function DashboardShell({
  role,
  heading,
  subheading,
  user,
  children,
}: {
  role: Role;
  heading: string;
  subheading: string;
  user?: { name: string; email: string };
  children: React.ReactNode;
}) {
  const sidebarUser = user ?? { name: "Guest", email: "" };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role={role} user={sidebarUser} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar role={role} title={portalLabel[role]} user={user} />
        <main className="flex-1 px-4 py-6 sm:px-8">
          <header className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{heading}</h1>
            <p className="mt-1 text-sm text-slate-500">{subheading}</p>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
