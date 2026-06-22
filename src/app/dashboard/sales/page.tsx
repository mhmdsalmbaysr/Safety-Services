import { Stat, Badge } from "@/components/ui";
import { deals, type DealStage } from "@/lib/mock-data";

const stages: DealStage[] = ["جديد", "تأهيل", "عرض سعر", "تفاوض", "مكسوب", "مفقود"];
const tone: Record<DealStage, "slate" | "blue" | "amber" | "green" | "red"> = {
  "جديد": "slate", "تأهيل": "slate", "عرض سعر": "blue",
  "تفاوض": "amber", "مكسوب": "green", "مفقود": "red",
};

export default function Sales() {
  const total = deals.reduce((s, d) => s + d.value, 0);
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">المبيعات وعروض الأسعار</h1>
        <p className="text-slate-500 mt-1">قمع المبيعات وتتبع الصفقات.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="إجمالي قيمة القمع" value={`${total.toLocaleString("ar-EG")} ر.س`} />
        <Stat label="صفقات مفتوحة" value={String(deals.filter((d) => d.stage !== "مكسوب" && d.stage !== "مفقود").length)} />
        <Stat label="معدل الإغلاق" value="34%" hint="+5%" />
      </div>

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        {stages.map((st) => {
          const items = deals.filter((d) => d.stage === st);
          return (
            <div key={st} className="card p-3 min-h-[160px]">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-sm font-bold text-slate-700">{st}</span>
                <Badge tone={tone[st]}>{items.length}</Badge>
              </div>
              <div className="space-y-2">
                {items.map((d) => (
                  <div key={d.id} className="rounded-xl border border-slate-200 p-3 bg-slate-50">
                    <div className="font-semibold text-sm text-slate-800">{d.client}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{d.activity} · {d.area} م²</div>
                    <div className="text-sm font-bold text-brand-700 mt-1.5">{d.value.toLocaleString("ar-EG")} ر.س</div>
                    <div className="text-xs text-slate-400 mt-1">المسؤول: {d.owner}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
