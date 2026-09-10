import { redirect } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import ProfileForm from "@/components/ProfileForm";
import { getSession } from "@/lib/auth";

export default async function AdminAccountPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <DashboardShell
      role="admin"
      heading="Account"
      subheading="Manage your profile and account details"
      user={{ name: session.name, email: session.email }}
    >
      <ProfileForm role="admin" name={session.name} email={session.email} />
    </DashboardShell>
  );
}
