import { redirect } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import CourseCatalog from "@/components/CourseCatalog";
import { getSession } from "@/lib/auth";
import { enrollments, programs } from "@/lib/data";

export default async function StudentCoursesPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const enrolledIds = enrollments.map((e) => e.courseId);
  const progressByProgram = Object.fromEntries(enrollments.map((e) => [e.courseId, e.progress]));

  return (
    <DashboardShell
      role="student"
      heading="Course Catalog"
      subheading="Browse CICCC diplomas, certificates and language programs — modeled on ciccc.ca."
      user={{ name: session.name, email: session.email }}
    >
      <CourseCatalog programs={programs} enrolledIds={enrolledIds} progressByProgram={progressByProgram} />
    </DashboardShell>
  );
}
