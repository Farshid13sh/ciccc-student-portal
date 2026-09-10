import Link from "next/link";

export interface AccountTab {
  key: string;
  label: string;
}

export default function AccountTabs({
  basePath,
  tabs,
  active,
}: {
  basePath: string;
  tabs: AccountTab[];
  active: string;
}) {
  return (
    <div className="mb-6 flex gap-1 overflow-x-auto border-b border-slate-200">
      {tabs.map((t) => {
        const isActive = t.key === active;
        return (
          <Link
            key={t.key}
            href={t.key === tabs[0].key ? basePath : `${basePath}?tab=${t.key}`}
            aria-current={isActive ? "page" : undefined}
            className={`-mb-px whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
              isActive
                ? "border-brand-600 text-brand-700"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}
