import { Stat, Badge, SectionTitle } from "@/components/ui";
import { purchases, technicians, obstacles } from "@/lib/mock-data";

export default function Execution() {
  const totalPurchases = purchases.reduce((s, p) => s + p.amount, 0);
  const totalVat = purchases.reduce((s, p) => s + p.vat, 0);
  const totalWages = technicians.reduce((s, t) => s + t.days * t.dailyWage, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">لوحة عزام — التنفيذ والمشاريع</h1>
        <p className="text-slate-500 mt-1">المشتريات، الضريبة الإلزامية، أجور الفنيين، وسجل المعوقات.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="إجمالي المشتريات" value={`${totalPurchases.toLocaleString("ar-EG")} ر.س`} />
        <Stat label="الضريبة المحصورة" value={`${totalVat.toLocaleString("ar-EG")} ر.س`} />
        <Stat label="أجور الفنيين" value={`${totalWages.toLocaleString("ar-EG")} ر.س`} />
        <Stat label="معوقات مفتوحة" value={String(obstacles.length)} />
      </div>

      {/* عزل بنود السلامة الثلاثة + الضريبة الإلزامية */}
      <div className="card p-6">
        <SectionTitle title="المشتريات وعزل بنود السلامة" />
        <div className="table-wrapper overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead>
              <tr className="text-slate-500 border-b border-slate-200">
                <th className="py-3 font-semibold">رقم الشغل</th>
                <th className="py-3 font-semibold">المورد</th>
                <th className="py-3 font-semibold">البند</th>
                <th className="py-3 font-semibold">القيمة</th>
                <th className="py-3 font-semibold">الضريبة</th>
                <th className="py-3 font-semibold">الفاتورة</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((p) => (
                <tr key={p.id} className="border-b border-slate-100 last:border-0">
                  <td className="py-3 font-semibold text-brand-700">{p.jobId}</td>
                  <td className="py-3">{p.supplier}</td>
                  <td className="py-3"><Badge tone="blue">{p.item}</Badge></td>
                  <td className="py-3">{p.amount.toLocaleString("ar-EG")} ر.س</td>
                  <td className="py-3 text-amber-700 font-semibold">{p.vat.toLocaleString("ar-EG")} ر.س</td>
                  <td className="py-3">
                    {p.hasInvoice
                      ? <Badge tone="green">مرفقة</Badge>
                      : <Badge tone="red">ناقصة</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* الفنيون الميدانيون وأجورهم */}
        <div className="card p-6">
          <SectionTitle title="الفنيون الميدانيون" />
          <div className="space-y-3">
            {technicians.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-3.5">
                <div>
                  <div className="font-semibold text-slate-800">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role} · {t.jobId}</div>
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-slate-900">
                    {(t.days * t.dailyWage).toLocaleString("ar-EG")} ر.س
                  </div>
                  <div className="text-xs text-slate-400">{t.days} يوم × {t.dailyWage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* سجل المعوقات + إثبات التوقيع المرفق */}
        <div className="card p-6">
          <SectionTitle title="سجل المعوقات وإثبات التوقيع" />
          <div className="space-y-3">
            {obstacles.map((o) => (
              <div key={o.id} className="rounded-xl border border-slate-200 p-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-brand-700">{o.jobId}</span>
                  <span className="text-xs text-slate-400">{o.date}</span>
                </div>
                <p className="text-sm text-slate-700 mt-1.5">{o.note}</p>
                <div className="mt-2">
                  {o.hasSignature
                    ? <Badge tone="green">✓ صورة التوقيع والختم مرفقة</Badge>
                    : <Badge tone="amber">بانتظار رفع التوقيع والختم</Badge>}
                </div>
              </div>
            ))}
          </div>
          <button className="btn-ghost w-full mt-4">+ رفع صورة توقيع/ختم ميداني</button>
        </div>
      </div>
    </div>
  );
}
