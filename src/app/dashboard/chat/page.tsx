"use client";
import { useState } from "react";
import { channels, messages } from "@/lib/mock-data";
import { Badge } from "@/components/ui";
import { Send, Hash, Users } from "lucide-react";

const roleTone: Record<string, "slate" | "blue" | "amber" | "green"> = {
  "العميل": "slate", "مبيعات": "blue", "استشاري": "amber", "تنفيذ": "green",
};

export default function Chat() {
  const [active, setActive] = useState(channels[0].id);
  const [draft, setDraft] = useState("");
  const [local, setLocal] = useState(messages);
  const current = channels.find((c) => c.id === active)!;
  const msgs = local.filter((m) => m.channelId === active);

  function send(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    setLocal((p) => [...p, {
      id: "M" + Date.now(), channelId: active, author: "عزّام", role: "تنفيذ",
      text: draft, time: "الآن", me: true,
    }]);
    setDraft("");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">الشات الداخلي</h1>
        <p className="text-slate-500 mt-1">غرف محادثة مشتركة لكل رقم شغل — بديل الواتساب.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {/* قائمة القنوات */}
        <div className="card p-3 lg:col-span-1">
          <div className="text-xs font-semibold text-slate-500 px-2 mb-2">غرف العمل</div>
          <div className="space-y-1">
            {channels.map((c) => (
              <button key={c.id} onClick={() => setActive(c.id)}
                className={`w-full text-right rounded-xl p-3 transition flex items-center justify-between gap-2
                  ${active === c.id ? "bg-brand-50 border border-brand-200" : "hover:bg-slate-50 border border-transparent"}`}>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 font-semibold text-sm text-slate-800">
                    <Hash className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{c.title}</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{c.jobId}</div>
                </div>
                {c.unread > 0 && <Badge tone="blue">{c.unread}</Badge>}
              </button>
            ))}
          </div>
        </div>

        {/* نافذة المحادثة */}
        <div className="card flex flex-col lg:col-span-2 xl:col-span-3 h-[60vh] min-h-[420px]">
          <div className="border-b border-slate-200 p-4 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Hash className="w-4 h-4 text-slate-400" />{current.title}
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <Users className="w-3.5 h-3.5" />{current.members.join(" · ")}
              </div>
            </div>
            <span className="text-xs text-slate-400">{current.jobId}</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/60">
            {msgs.map((m) => (
              <div key={m.id} className={`flex ${m.me ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[78%] rounded-2xl px-4 py-2.5 ${m.me ? "bg-brand-600 text-white" : "bg-white border border-slate-200"}`}>
                  {!m.me && (
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-xs font-bold text-slate-700">{m.author}</span>
                      <Badge tone={roleTone[m.role]}>{m.role}</Badge>
                    </div>
                  )}
                  <p className={`text-sm leading-relaxed ${m.me ? "text-white" : "text-slate-700"}`}>{m.text}</p>
                  <div className={`text-[11px] mt-1 ${m.me ? "text-brand-100" : "text-slate-400"}`}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={send} className="border-t border-slate-200 p-3 flex items-center gap-2">
            <input className="input" placeholder="اكتب رسالة…" value={draft} onChange={(e) => setDraft(e.target.value)} />
            <button className="btn-primary px-4 shrink-0"><Send className="w-4 h-4" /></button>
          </form>
        </div>
      </div>
    </div>
  );
}
