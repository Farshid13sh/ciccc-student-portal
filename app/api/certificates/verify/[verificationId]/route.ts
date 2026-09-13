// Deliberately public + unauthenticated — mirrors how real schools let
// anyone (an employer, another institution) verify a certificate ID
// without needing an account. Used by app/certificates/verify/page.tsx.
import { NextResponse } from "next/server";
import { certificates, programs } from "@/lib/data";

export async function GET(_request: Request, { params }: { params: { verificationId: string } }) {
  const certificate = certificates.find(
    (c) => c.verificationId.toLowerCase() === params.verificationId.trim().toLowerCase()
  );

  if (!certificate) {
    return NextResponse.json({ valid: false }, { status: 404 });
  }

  const program = programs.find((p) => p.id === certificate.courseId);

  return NextResponse.json({
    valid: true,
    student: certificate.student,
    program: program?.title ?? certificate.courseId,
    issuedDate: certificate.issuedDate,
    verificationId: certificate.verificationId,
  });
}
