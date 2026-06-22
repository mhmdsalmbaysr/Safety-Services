import Link from "next/link";
import { ShieldCheck, FileSearch, HardHat, TrendingUp, Building2, Lock, ArrowLeft } from "lucide-react";

const features = [
  { icon: Building2, title: "بيئات مستقلة لكل شركة", desc: "رابط مخصص ومساحة عمل معزولة تضمن خصوصية بيانات كل شركة سلامة وعملائها." },
  { icon: FileSearch, title: "محرك التحليل الإجرائي", desc: "فرز وتحديد المتطلبات والأنظمة آلياً بناءً على نوع النشاط والمساحة فور استلام الطلب." },
  { icon: HardHat, title: "لوحة عزام للتنفيذ", desc: "إدارة المشتريات والضريبة وأجور الفنيين وعزل بنود السلامة وسجل المعوقات الميداني." },
  { icon: Lock, title: "توثيق وحماية الحقوق", desc: "إلزامية رفع صورة التوقيع والختم الورقي الفعلي للعميل لإثبات الفحص ميدانياً." },
  { icon: TrendingUp, title: "قمع المبيعات والتحليلات", desc: "تتبع الصفقات وعروض الأسعار ومخططات الربحية والكفاءة التشغيلية." },
  { icon: ShieldCheck, title: "جاهزية التكامل الحكومي", desc: "هيكلية مرنة قابلة للربط المباشر مع أنظمة الدفاع المدني مستقبلاً." },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-bold">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-brand-600">
              <ShieldCheck className="w-5 h-5 text-white" />
            </span>
            خدمات السلامة والتراخيص
          </div>
          <div className="flex items-center gap-2">
            <Link href="/client" className="btn-ghost">بوابة العميل</Link>
            <Link href="/login" className="btn-primary">دخول لوحة التحكم</Link>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-12 text-center">
        <span className="badge bg-brand-50 text-brand-700 mb-4">منصة SaaS · نموذج أولي</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight max-w-3xl mx-auto">
          منصة موحدة لإدارة خدمات السلامة والتراخيص الفنية
        </h1>
        <p className="mt-5 text-slate-600 text-lg max-w-2xl mx-auto">
          من استقبال طلب العميل، إلى التحليل الإجرائي وعروض الأسعار، وصولاً للتنفيذ الميداني
          والتوثيق وحماية حقوق الشركة — كل ذلك في نظام سحابي مركزي واحد.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/login" className="btn-primary text-base px-6 py-3">
            استكشف لوحات التحكم <ArrowLeft className="w-4 h-4" />
          </Link>
          <Link href="/client" className="btn-ghost text-base px-6 py-3">جرّب بوابة العميل</Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-8 pb-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="card p-6">
              <span className="grid place-items-center w-11 h-11 rounded-xl bg-brand-50 text-brand-600 mb-4">
                <f.icon className="w-5.5 h-5.5 w-6 h-6" />
              </span>
              <h3 className="font-bold text-slate-900 mb-1.5">{f.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        نظام إدارة خدمات السلامة والتراخيص — نسخة كنموذج أولي.
      </footer>
    </div>
  );
}
