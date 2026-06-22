"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, LogIn } from "lucide-react";
import { ROLES, SESSION_COOKIE, type RoleId } from "@/lib/auth";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [role, setRole] = useState<RoleId>("execution");
  const [name, setName] = useState("عزّام");
  const [company, setCompany] = useState("شركة الأمان للسلامة");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const session = encodeURIComponent(JSON.stringify({ role, name, company }));
    document.cookie = `${SESSION_COOKIE}=${session}; path=/; max-age=86400; samesite=lax`;
    router.push(params.get("from") || "/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="card p-7">
      <h1 className="text-xl font-bold text-slate-900 mb-1">تسجيل الدخول</h1>
      <p className="text-sm text-slate-500 mb-6">اختر دورك للدخول إلى مساحة العمل.</p>
      <div className="space-y-4">
        <div>
          <label className="label">الاسم</label>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label className="label">الشركة</label>
          <input className="input" value={company} onChange={(e) => setCompany(e.target.value)} required />
        </div>
        <div>
          <label className="label">الدور</label>
          <select className="input" value={role} onChange={(e) => setRole(e.target.value as RoleId)}>
            {ROLES.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
          </select>
        </div>
        <button className="btn-primary w-full py-3 text-base">
          <LogIn className="w-4 h-4" /> دخول
        </button>
      </div>
      <p className="text-xs text-slate-400 mt-5 text-center">
        مصادقة تجريبية للنموذج الأولي — تُستبدل بنظام حقيقي + قاعدة بيانات لاحقاً.
      </p>
    </form>
  );
}

export default function Login() {
  return (
    <div className="min-h-screen grid place-items-center px-5 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2.5 font-bold mb-6">
          <span className="grid place-items-center w-10 h-10 rounded-xl bg-brand-600">
            <ShieldCheck className="w-5 h-5 text-white" />
          </span>
          خدمات السلامة والتراخيص
        </Link>
        <Suspense fallback={<div className="card p-7 text-center text-slate-400">جارٍ التحميل…</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
