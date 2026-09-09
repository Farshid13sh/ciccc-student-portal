import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
        BrightPath LMS
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
        One platform for courses, attendance &amp; payments
      </h1>
      <p className="mt-4 max-w-xl text-slate-600">
        A modern online school platform for students, instructors, and staff —
        course registration, learning materials, certificates, and more.
      </p>
      <Link
        href="/login"
        className="mt-8 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        Sign in to the demo →
      </Link>
    </main>
  );
}
