import Link from "next/link";
import { cookies } from "next/headers";
import { ShieldCheck, LayoutDashboard, TrendingUp, ClipboardList, HardHat, Crown, MessageSquare, BarChart3 } from "lucide-react";
import { SESSION_COOKIE, readSession, ROLES } from "@/lib/auth";
import LogoutButton from "@/components/logout-button";

const nav = [
  { href: "/dashboard", label: "النظرة العامة", icon: LayoutDashboard },
  { href: "/dashboard/sales", label: "المبيعات وعروض الأسعار", icon: TrendingUp },
  { href: "/dashboard/operations", label: "العمليات والتراخيص", icon: ClipboardList },
  { href: "/dashboard/execution", label: "لوحة عزام (التنفيذ)", icon: HardHat },
  { href: "/dashboard/chat", label: "الشات الداخلي", icon: MessageSquare },
  { href: "/dashboard/analytics", label: "التحليلات والربحية", icon: BarChart3 },
  { href: "/dashboard/admin", label: "إدارة الاشتراكات", icon: Crown },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = readSession(cookies().get(SESSION_COOKIE)?.value);
  const roleLabel = ROLES.find((r) => r.id === session?.role)?.label ?? "مستخدم";
  const name = session?.name ?? "مستخدم";
  const company = session?.company ?? "شركة السلامة";
  const initial = name.trim().charAt(0) || "؟";

  return (
    <div className="min-h-screen flex">
      <aside className="hidden md:flex w-72 shrink-0 flex-col bg-slate-950 text-slate-200 p-5">
        <Link href="/" className="flex items-center gap-2.5 mb-8 px-2">
          <span className="grid place-items-center w-10 h-10 rounded-xl bg-brand-600">
            <ShieldCheck className="w-5 h-5 text-white" />
          </span>
          <div className="leading-tight">
            <div className="font-bold text-white text-sm">خدمات السلامة</div>
            <div className="text-xs text-slate-400">{company}</div>
          </div>
        </Link>
        <nav className="flex flex-col gap-1">
          {nav.map((n) => (
            <Link key={n.href} href={n.href}
              className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition">
              <n.icon className="w-5 h-5" />
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-6 text-xs text-slate-500">نموذج أولي — بيانات تجريبية</div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-5 md:px-8">
          <div className="md:hidden flex items-center gap-2 font-bold">
            <ShieldCheck className="w-5 h-5 text-brand-600" /> خدمات السلامة
          </div>
          <div className="flex items-center gap-3 mr-auto">
            <div className="text-left leading-tight">
              <div className="text-sm font-semibold text-slate-900">{name}</div>
              <div className="text-xs text-slate-500">{roleLabel}</div>
            </div>
            <span className="grid place-items-center w-10 h-10 rounded-full bg-brand-100 text-brand-700 font-bold">{initial}</span>
            <LogoutButton />
          </div>
        </header>
        <main className="flex-1 p-5 md:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
