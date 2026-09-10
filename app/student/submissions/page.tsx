import { redirect } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import SubmissionManager from "@/components/SubmissionManager";
import { getSession } from "@/lib/auth";

export default async function StudentSubmissionsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <DashboardShell
      role="student"
      heading="Project submissions"
      subheading="Submit your coursework for review"
      user={{ name: session.name, email: session.email }}
    >
      <SubmissionManager />
    </DashboardShell>
  );
}
