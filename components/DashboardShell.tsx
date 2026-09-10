import Sidebar from "./Sidebar";
import NotificationBell from "./NotificationBell";
import ProfileMenu from "./ProfileMenu";
import type { Role } from "@/lib/types";
import { notificationsForRole } from "@/lib/notifications";

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
          <div className="flex items-center gap-3">
            <NotificationBell initial={notificationsForRole(role)} />
            {user && <ProfileMenu role={role} name={user.name} email={user.email} />}
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
