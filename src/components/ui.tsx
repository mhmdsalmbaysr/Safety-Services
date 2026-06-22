import Link from "next/link";

export function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="stat-card">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-2xl font-bold text-slate-900">{value}</span>
      {hint && <span className="text-xs text-emerald-600 font-medium">{hint}</span>}
    </div>
  );
}

const tones: Record<string, string> = {
  green: "bg-emerald-50 text-emerald-700",
  blue: "bg-brand-50 text-brand-700",
  amber: "bg-amber-50 text-amber-700",
  red: "bg-rose-50 text-rose-700",
  slate: "bg-slate-100 text-slate-600",
};

export function Badge({ children, tone = "slate" }: { children: React.ReactNode; tone?: keyof typeof tones }) {
  return <span className={`badge ${tones[tone]}`}>{children}</span>;
}

export function SectionTitle({ title, action }: { title: string; action?: { href: string; label: string } }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      {action && (
        <Link href={action.href} className="text-sm font-semibold text-brand-600 hover:text-brand-700">
          {action.label}
        </Link>
      )}
    </div>
  );
}
