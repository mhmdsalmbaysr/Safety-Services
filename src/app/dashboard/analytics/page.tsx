import { Stat, Badge, SectionTitle } from "@/components/ui";
import { jobFinance, monthlyRevenue } from "@/lib/mock-data";

export default function Analytics() {
  const totalRev = jobFinance.reduce((s, j) => s + j.revenue, 0);
  const totalCost = jobFinance.reduce((s, j) => s + j.cost, 0);
  const profit = totalRev - totalCost;
  const margin = Math.round((profit / totalRev) * 100);
  const maxRev = Math.max(...monthlyRevenue.map((m) => m.value));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">المخططات التحليلية للربحية</h1>
        <p className="text-slate-500 mt-1">محرك تحليل الربحية والكفاءة التشغيلية.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="إجمالي الإيرادات" value={`${totalRev.toLocaleString("ar-EG")} ر.س`} />
        <Stat label="إجمالي التكاليف" value={`${totalCost.toLocaleString("ar-EG")} ر.س`} />
        <Stat label="صافي الربح" value={`${profit.toLocaleString("ar-EG")} ر.س`} hint={`هامش ${margin}%`} />
        <Stat label="متوسط هامش المشروع" value={`${margin}%`} />
      </div>

      {/* مخطط الإيرادات الشهرية (أعمدة) */}
      <div className="card p-6">
        <SectionTitle title="الإيرادات الشهرية (بالألف ر.س)" />
        <div className="flex items-end justify-between gap-3 h-56 pt-4">
          {monthlyRevenue.map((m) => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">{m.value}</span>
              <div className="w-full rounded-t-lg bg-brand-500 transition-all hover:bg-brand-600"
                   style={{ height: `${(m.value / maxRev) * 100}%` }} />
              <span className="text-xs text-slate-500">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ربحية المشاريع (شريط إيراد مقابل تكلفة) */}
      <div className="card p-6">
        <SectionTitle title="ربحية المشاريع" />
        <div className="space-y-5">
          {jobFinance.map((j) => {
            const m = Math.round(((j.revenue - j.cost) / j.revenue) * 100);
            const costPct = (j.cost / j.revenue) * 100;
            return (
              <div key={j.jobId}>
                <div className="flex items-center justify-between mb-1.5 text-sm">
                  <div className="font-semibold text-slate-800">
                    {j.client} <span className="text-slate-400 font-normal">· {j.jobId}</span>
                  </div>
                  <Badge tone={m >= 25 ? "green" : m >= 15 ? "amber" : "red"}>هامش {m}%</Badge>
                </div>
                <div className="h-7 w-full rounded-lg bg-emerald-100 overflow-hidden relative" dir="rtl">
                  <div className="h-full bg-rose-400/80" style={{ width: `${costPct}%` }} />
                  <div className="absolute inset-0 flex items-center justify-between px-3 text-xs font-semibold">
                    <span className="text-rose-800">تكلفة {j.cost.toLocaleString("ar-EG")}</span>
                    <span className="text-emerald-800">إيراد {j.revenue.toLocaleString("ar-EG")}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-5 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-rose-400/80" /> التكلفة</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300" /> الربح</span>
        </div>
      </div>
    </div>
  );
}
