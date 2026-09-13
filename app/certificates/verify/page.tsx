import Link from "next/link";
import CertificateVerifyForm from "@/components/CertificateVerifyForm";

export default function VerifyCertificatePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
        CICCC Certificate Verification
      </p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Verify a graduate's certificate
      </h1>
      <p className="mt-3 max-w-lg text-slate-600">
        Enter a certificate's verification ID to confirm it was issued by CICCC. Try{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5">CICCC-CP120-88213</code> for a demo
        graduate.
      </p>
      <div className="mt-8">
        <CertificateVerifyForm />
      </div>
      <Link href="/" className="mt-10 text-sm font-medium text-slate-500 hover:text-brand-600">
        ← Back home
      </Link>
    </main>
  );
}
