import NotificationBell from "./NotificationBell";
import ProfileMenu from "./ProfileMenu";
import type { Role } from "@/lib/types";
import { notificationsForRole } from "@/lib/notifications";

export default function TopBar({
  role,
  title,
  user,
}: {
  role: Role;
  title: string;
  user?: { name: string; email: string };
}) {
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-8">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-700">{title}</p>
      </div>
      <div className="flex flex-1 items-center justify-end gap-3">
        <div className="hidden max-w-xs flex-1 sm:block">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              🔍
            </span>
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-3 text-sm text-slate-600 placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            />
          </label>
        </div>
        <NotificationBell initial={notificationsForRole(role)} />
        {user && <ProfileMenu role={role} name={user.name} email={user.email} />}
      </div>
    </div>
  );
}
