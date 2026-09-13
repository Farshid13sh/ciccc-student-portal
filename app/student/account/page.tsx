import Link from "next/link";
import { redirect } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import ProfileForm from "@/components/ProfileForm";
import AccountTabs from "@/components/AccountTabs";
import TuitionCheckout from "@/components/TuitionCheckout";
import Badge from "@/components/Badge";
import { getSession } from "@/lib/auth";
import { findAuthUserById } from "@/lib/auth-users";
import { certificates, enrollments, payments, programs } from "@/lib/data";

const TABS = [
  { key: "profile", label: "Profile & Settings" },
  { key: "billing", label: "Tuition & Payments" },
  { key: "certificates", label: "Certificate" },
];

export default async function StudentAccountPage({
  searchParams,
}: {
  searchParams: { tab?: string; program?: string };
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  const user = findAuthUserById(session.sub);
  const active = TABS.some((t) => t.key === searchParams.tab) ? searchParams.tab! : "profile";

  const enrolledIds = new Set(enrollments.map((e) => e.courseId));
  const checkoutProgram = searchParams.program
    ? programs.find((p) => p.id === searchParams.program && !enrolledIds.has(p.id))
    : undefined;

  const myPrograms = enrollments
    .map((e) => programs.find((p) => p.id === e.courseId))
    .filter((p): p is (typeof programs)[number] => Boolean(p));

  const totalPaid = payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);

  return (
    <DashboardShell
      role="student"
      heading="Account"
      subheading="Your profile, tuition and payment history, and certificates"
      user={{ name: session.name, email: session.email }}
    >
      <AccountTabs basePath="/student/account" tabs={TABS} active={active} />

      {active === "profile" && (
        <ProfileForm
          role="student"
          name={session.name}
          email={session.email}
          studentId={user?.studentId}
          program={user?.program}
        />
      )}

      {active === "billing" && (
        <div className="space-y-6">
          {checkoutProgram && <TuitionCheckout program={checkoutProgram} />}

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">Your programs</h2>
            <ul className="mt-3 space-y-3">
              {myPrograms.map((p) => (
                <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-100 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {p.code} · {p.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      Tuition ${p.tuitionDomestic.toLocaleString()} · Materials ${p.materialsFee.toLocaleString()} · Application ${p.applicationFee.toLocaleString()}
                    </p>
                  </div>
                  <Badge label="paid" />
                </li>
              ))}
            </ul>
          </section>

          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3">
              <h2 className="text-sm font-semibold">Billing history</h2>
              <p className="text-sm text-slate-500">
                Total paid: <span className="font-semibold text-slate-800">${totalPaid.toLocaleString()}</span>
              </p>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th scope="col" className="px-5 py-3 font-medium">Program</th>
                  <th scope="col" className="px-5 py-3 font-medium">Amount</th>
                  <th scope="col" className="px-5 py-3 font-medium">Status</th>
                  <th scope="col" className="px-5 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map((p) => (
                  <tr key={p.id}>
                    <td className="px-5 py-3 font-medium text-brand-700">{p.course}</td>
                    <td className="px-5 py-3">${p.amount.toLocaleString()}</td>
                    <td className="px-5 py-3">
                      <Badge label={p.status} />
                    </td>
                    <td className="px-5 py-3 text-slate-500">{p.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      )}

      {active === "certificates" && (
        <div className="space-y-4">
          {certificates.length === 0 ? (
            <p className="text-sm text-slate-500">Complete a program to earn your first certificate.</p>
          ) : (
            certificates.map((cert) => {
              const program = programs.find((p) => p.id === cert.courseId);
              return (
                <div
                  key={cert.id}
                  className="overflow-hidden rounded-2xl border-2 border-brand-100 bg-gradient-to-br from-brand-50 to-white p-8 text-center shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
                    CICCC · Certificate of Completion
                  </p>
                  <p className="mt-4 text-2xl font-bold text-slate-900">{cert.student}</p>
                  <p className="mt-2 text-sm text-slate-600">has successfully completed</p>
                  <p className="mt-1 text-lg font-semibold text-brand-800">{program?.title ?? cert.courseId}</p>
                  <p className="mt-4 text-xs text-slate-500">Issued {cert.issuedDate}</p>
                  <p className="mt-1 text-[11px] text-slate-400">Verification ID: {cert.verificationId}</p>
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      disabled
                      className="rounded-lg border border-brand-200 px-4 py-1.5 text-xs font-semibold text-brand-700 opacity-60"
                      title="Demo only — no PDF is generated"
                    >
                      ⬇ Download PDF (demo)
                    </button>
                    <Link
                      href="/certificates/verify"
                      className="text-xs font-semibold text-brand-600 hover:underline"
                    >
                      Verify this certificate publicly →
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </DashboardShell>
  );
}
