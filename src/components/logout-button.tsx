"use client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { SESSION_COOKIE } from "@/lib/auth";

export default function LogoutButton() {
  const router = useRouter();
  function logout() {
    document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0`;
    router.push("/login");
    router.refresh();
  }
  return (
    <button onClick={logout} title="تسجيل الخروج"
      className="grid place-items-center w-9 h-9 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-rose-600 transition">
      <LogOut className="w-4.5 h-4.5 w-5 h-5" />
    </button>
  );
}
