import { Stat, Badge, SectionTitle } from "@/components/ui";
import { jobs } from "@/lib/mock-data";

const statusTone: Record<string, "green" | "blue" | "amber" | "slate"> = {
  "مكتمل": "green", "قيد التنفيذ": "blue", "بانتظار الفحص": "amber",
  "تحت الدراسة": "slate", "بانتظار التحليل": "slate",
};

export default function Overview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">النظرة العامة</h1>
        <p className="text-slate-500 mt-1">ملخص لحظي لأداء العمليات والمشاريع.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="طلبات نشطة" value="38" hint="+6 هذا الأسبوع" />
        <Stat label="صفقات قيد التفاوض" value="12" hint="+2 اليوم" />
        <Stat label="إيرادات الشهر" value="412,500 ر.س" hint="+18%" />
        <Stat label="ضريبة مستردة محصورة" value="61,300 ر.س" />
      </div>

      <div className="card p-6">
        <SectionTitle title="أحدث أرقام الشغل" action={{ href: "/dashboard/operations", label: "كل العمليات" }} />
        <div className="table-wrapper overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead>
              <tr className="text-slate-500 border-b border-slate-200">
                <th className="py-3 font-semibold">رقم الشغل</th>
                <th className="py-3 font-semibold">العميل</th>
                <th className="py-3 font-semibold">النشاط</th>
                <th className="py-3 font-semibold">الاستشاري</th>
                <th className="py-3 font-semibold">الحالة</th>
                <th className="py-3 font-semibold">آخر تحديث</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr key={j.id} className="border-b border-slate-100 last:border-0">
                  <td className="py-3 font-semibold text-brand-700">{j.id}</td>
                  <td className="py-3">{j.client}</td>
                  <td className="py-3 text-slate-600">{j.activity}</td>
                  <td className="py-3 text-slate-600">{j.consultant}</td>
                  <td className="py-3"><Badge tone={statusTone[j.status]}>{j.status}</Badge></td>
                  <td className="py-3 text-slate-400">{j.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
