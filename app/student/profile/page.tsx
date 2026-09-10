import { redirect } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import ProfileForm from "@/components/ProfileForm";
import { getSession } from "@/lib/auth";
import { findAuthUserById } from "@/lib/auth-users";

export default async function StudentProfilePage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const user = findAuthUserById(session.sub);

  return (
    <DashboardShell
      role="student"
      heading="Profile & account"
      subheading="Manage your account details"
      user={{ name: session.name, email: session.email }}
    >
      <ProfileForm
        role="student"
        name={session.name}
        email={session.email}
        studentId={user?.studentId}
        program={user?.program}
      />
    </DashboardShell>
  );
}
