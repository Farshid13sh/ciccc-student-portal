import Link from "next/link";
import type { Role } from "@/lib/types";
import { logout } from "@/app/login/actions";

const nav: Record<Role, { href: string; label: string; icon: string }[]> = {
  student: [
    { href: "/student", label: "Dashboard", icon: "🏠" },
    { href: "/student/courses/c1", label: "My Courses", icon: "📚" },
    { href: "/login", label: "Payments", icon: "💳" },
  ],
  instructor: [
    { href: "/instructor", label: "Dashboard", icon: "🏠" },
    { href: "/instructor", label: "My Courses", icon: "📚" },
    { href: "/instructor", label: "Students", icon: "🎓" },
    { href: "/instructor", label: "Attendance", icon: "✅" },
  ],
  admin: [
    { href: "/admin", label: "Dashboard", icon: "🏠" },
    { href: "/admin", label: "Users", icon: "👥" },
    { href: "/admin", label: "Payments", icon: "💳" },
    { href: "/admin", label: "Reports", icon: "📈" },
  ],
};

export default function Sidebar({ role, title }: { role: Role; title: string }) {
  return (
    <aside className="flex w-16 flex-col border-r border-slate-200 bg-white md:w-56">
      <div className="hidden px-5 py-5 md:block">
        <p className="text-lg font-bold text-brand-700">BrightPath</p>
        <p className="text-xs capitalize text-slate-500">{role} portal</p>
      </div>
      <nav aria-label={title} className="flex-1 space-y-1 px-2 py-4 md:px-3">
        {nav[role].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            aria-label={item.label}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-brand-50 hover:text-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <span aria-hidden>{item.icon}</span>
            <span className="hidden md:inline">{item.label}</span>
          </Link>
        ))}
      </nav>
      <form action={logout} className="m-3">
        <button
          type="submit"
          className="w-full rounded-lg px-3 py-2 text-center text-sm font-medium text-slate-500 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <span aria-hidden>↩️</span> <span className="hidden md:inline">Log out</span>
        </button>
      </form>
    </aside>
  );
}
