// Public REST endpoint over the program catalog. This is a genuine network
// boundary (the client fetches JSON over HTTP, not a direct function call)
// used by components/CourseCatalog.tsx to power search + category
// filtering — see README's "API layer" section for how to try it with curl.
import { NextResponse, type NextRequest } from "next/server";
import { programs } from "@/lib/data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();
  const category = searchParams.get("category");

  const results = programs.filter((p) => {
    const matchesCategory = !category || category === "All" || p.category === category;
    const matchesQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  return NextResponse.json({ count: results.length, programs: results });
}
