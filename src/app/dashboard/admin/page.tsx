import { Stat, Badge, SectionTitle } from "@/components/ui";
import { companies } from "@/lib/mock-data";

const planTone: Record<string, "slate" | "blue" | "green"> = {
  "أساسي": "slate", "احترافي": "blue", "مؤسسات": "green",
};

export default function Admin() {
  const active = companies.filter((c) => c.status === "نشط").length;
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">إدارة الاشتراكات (SaaS)</h1>
        <p className="text-slate-500 mt-1">لوحة التحكم العليا لإدارة شركات السلامة المشتركة وباقاتها.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="شركات مشتركة" value={String(companies.length)} />
        <Stat label="اشتراكات نشطة" value={String(active)} />
        <Stat label="إيراد شهري متكرر" value="68,000 ر.س" hint="+12%" />
        <Stat label="مستخدمون كلّيون" value={String(companies.reduce((s, c) => s + c.users, 0))} />
      </div>

      <div className="card p-6">
        <SectionTitle title="الشركات المشتركة" />
        <div className="table-wrapper overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead>
              <tr className="text-slate-500 border-b border-slate-200">
                <th className="py-3 font-semibold">الشركة</th>
                <th className="py-3 font-semibold">الرابط المخصص</th>
                <th className="py-3 font-semibold">الباقة</th>
                <th className="py-3 font-semibold">المستخدمون</th>
                <th className="py-3 font-semibold">المشاريع</th>
                <th className="py-3 font-semibold">التجديد</th>
                <th className="py-3 font-semibold">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c) => (
                <tr key={c.id} className="border-b border-slate-100 last:border-0">
                  <td className="py-3 font-semibold text-slate-800">{c.name}</td>
                  <td className="py-3 text-slate-500 ltr:text-left" dir="ltr">/{c.slug}</td>
                  <td className="py-3"><Badge tone={planTone[c.plan]}>{c.plan}</Badge></td>
                  <td className="py-3 text-slate-600">{c.users}</td>
                  <td className="py-3 text-slate-600">{c.jobs}</td>
                  <td className="py-3 text-slate-500" dir="ltr">{c.renewsOn}</td>
                  <td className="py-3">
                    {c.status === "نشط"
                      ? <Badge tone="green">نشط</Badge>
                      : <Badge tone="red">موقوف</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
