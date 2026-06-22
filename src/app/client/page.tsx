"use client";
import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, FileSearch, CheckCircle2, ArrowRight } from "lucide-react";
import { analyzeRequirements } from "@/lib/mock-data";

export default function ClientPortal() {
  const [activity, setActivity] = useState("مطعم");
  const [area, setArea] = useState(220);
  const [submitted, setSubmitted] = useState(false);
  const reqs = analyzeRequirements(activity, Number(area) || 0);
  const jobNo = "JOB-25-" + String(Math.floor(Math.random() * 9000) + 1000);

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-brand-600">
              <ShieldCheck className="w-5 h-5 text-white" />
            </span>
            بوابة عملاء · شركة الأمان للسلامة
          </Link>
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1">
            الرئيسية <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-10 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h1 className="text-2xl font-bold text-slate-900">تقديم طلب ترخيص سلامة جديد</h1>
          <p className="text-slate-600 mt-2 mb-6">
            عبّئ بيانات المنشأة ورخصة البناء، وسيقوم محرك التحليل بتحديد المتطلبات فوراً.
          </p>

          {submitted ? (
            <div className="card p-8 text-center">
              <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-slate-900">تم استلام طلبك بنجاح</h2>
              <p className="text-slate-600 mt-2">
                رقم الشغل الخاص بك:
                <span className="font-bold text-brand-700 mx-1">{jobNo}</span>
              </p>
              <p className="text-sm text-slate-500 mt-1">
                استخدمه للاستعلام اللحظي ومتابعة التحديثات داخل مساحة العمل المشتركة.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn-ghost mt-6">
                تقديم طلب آخر
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="card p-6 grid gap-4 sm:grid-cols-2"
            >
              <div className="sm:col-span-2">
                <label className="label">اسم المنشأة</label>
                <input className="input" placeholder="مثال: مطعم الذواقة" required />
              </div>
              <div>
                <label className="label">نوع النشاط</label>
                <select className="input" value={activity} onChange={(e) => setActivity(e.target.value)}>
                  {["مطعم", "مستودع", "ورشة", "عيادة", "صالة مناسبات", "مكتب إداري"].map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">المساحة (م²)</label>
                <input type="number" className="input" value={area}
                  onChange={(e) => setArea(Number(e.target.value))} min={1} required />
              </div>
              <div>
                <label className="label">رقم رخصة البناء</label>
                <input className="input" placeholder="BL-XXXXXX" required />
              </div>
              <div>
                <label className="label">جوال التواصل</label>
                <input className="input" placeholder="05XXXXXXXX" required />
              </div>
              <div className="sm:col-span-2">
                <label className="label">مرفقات (مخطط هندسي / رخصة)</label>
                <input type="file" className="input file:btn-ghost file:ml-3 file:py-1" />
              </div>
              <div className="sm:col-span-2">
                <button className="btn-primary w-full text-base py-3">إرسال الطلب</button>
              </div>
            </form>
          )}
        </div>

        <aside className="lg:col-span-2">
          <div className="card p-6 sticky top-6">
            <div className="flex items-center gap-2 text-brand-700 font-bold mb-3">
              <FileSearch className="w-5 h-5" /> محرك التحليل الإجرائي
            </div>
            <p className="text-sm text-slate-500 mb-4">
              المتطلبات المبدئية لنشاط «{activity}» بمساحة {area} م²:
            </p>
            <ul className="space-y-2.5">
              {reqs.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="w-4.5 h-4.5 w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  {r}
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-400 mt-4 leading-relaxed">
              * نتائج تقديرية للنموذج الأولي، تُعتمد نهائياً من المهندس الاستشاري.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}
