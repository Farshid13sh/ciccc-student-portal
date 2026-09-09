import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, roleHome, verifySessionToken } from "@/lib/session";
import type { Role } from "@/lib/types";

const roleForPath: { prefix: string; role: Role }[] = [
  { prefix: "/student", role: "student" },
  { prefix: "/instructor", role: "instructor" },
  { prefix: "/admin", role: "admin" },
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const match = roleForPath.find((r) => pathname.startsWith(r.prefix));
  if (!match) return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    const url = new URL("/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (session.role !== match.role) {
    // Signed in, but this dashboard belongs to a different role.
    return NextResponse.redirect(new URL(roleHome(session.role), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/student/:path*", "/instructor/:path*", "/admin/:path*"],
};
