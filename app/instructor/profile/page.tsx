import { redirect } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import ProfileForm from "@/components/ProfileForm";
import { getSession } from "@/lib/auth";
import { findAuthUserById } from "@/lib/auth-users";

export default async function InstructorProfilePage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const user = findAuthUserById(session.sub);

  return (
    <DashboardShell
      role="instructor"
      heading="Profile & account"
      subheading="Manage your account details"
      user={{ name: session.name, email: session.email }}
    >
      <ProfileForm
        role="instructor"
        name={session.name}
        email={session.email}
        employeeId={user?.employeeId}
        department={user?.department}
      />
    </DashboardShell>
  );
}
