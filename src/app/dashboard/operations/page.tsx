import { Badge, SectionTitle } from "@/components/ui";
import { jobs, analyzeRequirements } from "@/lib/mock-data";

const statusTone: Record<string, "green" | "blue" | "amber" | "slate"> = {
  "مكتمل": "green", "قيد التنفيذ": "blue", "بانتظار الفحص": "amber",
  "تحت الدراسة": "slate", "بانتظار التحليل": "slate",
};

export default function Operations() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">العمليات والتراخيص</h1>
        <p className="text-slate-500 mt-1">معالجة الطلبات ومخرجات محرك التحليل الإجرائي.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {jobs.map((j) => {
          const reqs = analyzeRequirements(j.activity, j.area);
          return (
            <div key={j.id} className="card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-bold text-brand-700">{j.id}</div>
                  <div className="text-lg font-semibold text-slate-900 mt-0.5">{j.client}</div>
                  <div className="text-sm text-slate-500">{j.activity} · {j.area} م² · {j.consultant}</div>
                </div>
                <Badge tone={statusTone[j.status]}>{j.status}</Badge>
              </div>

              <div className="mt-4">
                <div className="text-xs font-semibold text-slate-500 mb-2">الأنظمة المعتمدة</div>
                <div className="flex flex-wrap gap-2">
                  {j.systems.map((s) => <Badge key={s} tone="blue">{s}</Badge>)}
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-4">
                <div className="text-xs font-semibold text-slate-500 mb-2">المتطلبات الآلية (محرك التحليل)</div>
                <ul className="text-sm text-slate-700 space-y-1.5 list-disc pr-5">
                  {reqs.map((r) => <li key={r}>{r}</li>)}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
