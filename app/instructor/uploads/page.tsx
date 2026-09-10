import { redirect } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import UploadManager from "@/components/UploadManager";
import { getSession } from "@/lib/auth";

export default async function InstructorUploadsPage({
  searchParams,
}: {
  searchParams: { course?: string };
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <DashboardShell
      role="instructor"
      heading="Video uploads"
      subheading="Add lesson videos to your programs"
      user={{ name: session.name, email: session.email }}
    >
      <UploadManager initialCourseCode={searchParams.course} />
    </DashboardShell>
  );
}
