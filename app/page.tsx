import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
        CICCC Student Portal
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
        One platform for programs, attendance &amp; tuition
      </h1>
      <p className="mt-4 max-w-xl text-slate-600">
        A modern online school platform for students, instructors, and staff —
        program enrollment, learning materials, certificates, and more.
      </p>
      <Link
        href="/login"
        className="mt-8 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        Sign in to the demo →
      </Link>
      <Link href="/certificates/verify" className="mt-4 text-sm font-medium text-slate-500 hover:text-brand-600">
        Verify a graduate's certificate →
      </Link>
    </main>
  );
}
