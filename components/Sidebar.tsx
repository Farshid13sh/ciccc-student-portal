"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Role } from "@/lib/types";

const nav: Record<Role, { href: string; label: string; icon: string }[]> = {
  student: [
    { href: "/student", label: "Dashboard", icon: "🏠" },
    { href: "/student/courses", label: "Course Catalog", icon: "📚" },
    { href: "/student/learn", label: "My Learning", icon: "🎓" },
    { href: "/student/account", label: "Account", icon: "⚙️" },
  ],
  instructor: [
    { href: "/instructor", label: "Dashboard", icon: "🏠" },
    { href: "/instructor/courses", label: "Programs", icon: "📚" },
    { href: "/instructor/uploads", label: "Uploads", icon: "🎥" },
    { href: "/instructor/students", label: "Students", icon: "🎓" },
    { href: "/instructor/attendance", label: "Attendance", icon: "✅" },
    { href: "/instructor/account", label: "Account", icon: "⚙️" },
  ],
  admin: [
    { href: "/admin", label: "Dashboard", icon: "🏠" },
    { href: "/admin/users", label: "Users", icon: "👥" },
    { href: "/admin/payments", label: "Payments", icon: "💳" },
    { href: "/admin/reports", label: "Reports", icon: "📈" },
    { href: "/admin/account", label: "Account", icon: "⚙️" },
  ],
};

function initialsOf(name: string): string {
  return name.split(" ").map((p) => p[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
}

export default function Sidebar({
  role,
  user,
}: {
  role: Role;
  user: { name: string; email: string };
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) =>
    href === `/${role}` ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside
      className={`flex flex-col border-r border-slate-200 bg-white transition-[width] duration-200 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-4 py-5">
        {!collapsed && (
          <div>
            <p className="text-lg font-bold text-brand-700">CICCC</p>
            <p className="text-xs capitalize text-slate-500">{role} portal</p>
          </div>
        )}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <span aria-hidden>{collapsed ? "»" : "«"}</span>
        </button>
      </div>

      {!collapsed && (
        <p className="px-5 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Navigation
        </p>
      )}
      <nav aria-label={`${role} navigation`} className="flex-1 space-y-1 px-2 pb-4">
        {nav[role].map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              className={`relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                active ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-50 hover:text-brand-700"
              }`}
            >
              {active && (
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-brand-600"
                />
              )}
              <span aria-hidden>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className={`border-t border-slate-100 px-3 py-4 ${collapsed ? "flex justify-center" : ""}`}>
        <div className={`flex items-center gap-3 ${collapsed ? "" : "rounded-lg bg-slate-50 px-3 py-2"}`}>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
            {initialsOf(user.name)}
          </span>
          {!collapsed && (
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-slate-700">{user.name}</span>
              <span className="block truncate text-xs capitalize text-slate-500">{role}</span>
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}
