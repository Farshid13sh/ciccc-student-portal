const tones: Record<string, string> = {
  paid: "bg-emerald-100 text-emerald-800",
  pending: "bg-amber-100 text-amber-800",
  refunded: "bg-slate-200 text-slate-600",
  failed: "bg-rose-100 text-rose-800",
  published: "bg-emerald-100 text-emerald-800",
  draft: "bg-slate-200 text-slate-600",
  active: "bg-emerald-100 text-emerald-800",
  invited: "bg-amber-100 text-amber-800",
  present: "bg-emerald-100 text-emerald-800",
  late: "bg-amber-100 text-amber-800",
  absent: "bg-rose-100 text-rose-800",
  Bestseller: "bg-brand-100 text-brand-700",
  New: "bg-emerald-100 text-emerald-800",
  "Top Rated": "bg-amber-100 text-amber-800",
  Popular: "bg-brand-100 text-brand-700",
  "Co-op": "bg-purple-100 text-purple-700",
};

export default function Badge({ label }: { label: string }) {
  const tone = tones[label] ?? "bg-slate-200 text-slate-700";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${tone}`}>
      {label}
    </span>
  );
}
