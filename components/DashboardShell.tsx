import Sidebar from "./Sidebar";
import type { Role } from "@/lib/types";

export default function DashboardShell({
  role, heading, subheading, user, children,
}: {
  role: Role;
  heading: string;
  subheading: string;
  user?: { name: string; email: string };
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} title={`${role} navigation`} />
      <main className="flex-1 px-4 py-6 sm:px-8">
        <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
            <p className="mt-1 text-sm text-slate-500">{subheading}</p>
          </div>
          {user && (
            <div className="text-right text-sm">
              <p className="font-medium text-slate-700">{user.name}</p>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
          )}
        </header>
        {children}
      </main>
    </div>
  );
}
