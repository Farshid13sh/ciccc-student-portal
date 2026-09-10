import { notFound } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import { demoPersonaForRole } from "@/lib/auth-users";
import { isRole, roleMeta } from "@/lib/roles";

export default function RoleLogin({
  params,
  searchParams,
}: {
  params: { role: string };
  searchParams: { created?: string; email?: string };
}) {
  if (!isRole(params.role)) notFound();
  const role = params.role;
  const persona = demoPersonaForRole(role);

  return (
    <LoginForm
      role={role}
      demoPersona={{ name: persona.name, email: persona.email }}
      allowSignup={roleMeta[role].allowSignup}
      createdEmail={searchParams.created ? searchParams.email : undefined}
    />
  );
}
