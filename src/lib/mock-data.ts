// بيانات تجريبية للنموذج الأولي (Prototype mock data)

export type DealStage = "جديد" | "تأهيل" | "عرض سعر" | "تفاوض" | "مكسوب" | "مفقود";
export type JobStatus = "بانتظار التحليل" | "تحت الدراسة" | "قيد التنفيذ" | "بانتظار الفحص" | "مكتمل";

export interface Company {
  id: string;
  name: string;
  slug: string; // الرابط المخصص
  plan: "أساسي" | "احترافي" | "مؤسسات";
  status: "نشط" | "موقوف";
  users: number;
  jobs: number;
  renewsOn: string;
}

export interface Deal {
  id: string;
  client: string;
  activity: string;
  area: number;
  value: number;
  stage: DealStage;
  owner: string;
}

export interface Job {
  id: string; // رقم الشغل
  client: string;
  activity: string;
  area: number;
  systems: string[];
  status: JobStatus;
  consultant: string;
  updatedAt: string;
}

export interface Purchase {
  id: string;
  jobId: string;
  supplier: string;
  item: "إنذار" | "إطفاء" | "تهوية";
  amount: number;
  vat: number; // الضريبة الإلزامية
  hasInvoice: boolean;
}

export interface Technician {
  id: string;
  name: string;
  role: string;
  jobId: string;
  days: number;
  dailyWage: number;
}

export interface ObstacleLog {
  id: string;
  jobId: string;
  date: string;
  note: string;
  hasSignature: boolean; // إثبات التوقيع المرفق
}

export const companies: Company[] = [
  { id: "C-001", name: "شركة الأمان للسلامة", slug: "aman", plan: "احترافي", status: "نشط", users: 14, jobs: 38, renewsOn: "2026-09-12" },
  { id: "C-002", name: "درع الوقاية الفنية", slug: "dera3", plan: "مؤسسات", status: "نشط", users: 31, jobs: 96, renewsOn: "2026-07-30" },
  { id: "C-003", name: "حماية بلس", slug: "plus", plan: "أساسي", status: "موقوف", users: 5, jobs: 9, renewsOn: "2026-06-01" },
];

export const deals: Deal[] = [
  { id: "D-1001", client: "مطعم الذواقة", activity: "مطعم", area: 220, value: 18500, stage: "عرض سعر", owner: "سارة" },
  { id: "D-1002", client: "مستودع النخبة", activity: "مستودع", area: 1400, value: 96000, stage: "تفاوض", owner: "خالد" },
  { id: "D-1003", client: "صالة أفراح اللؤلؤة", activity: "صالة مناسبات", area: 900, value: 72000, stage: "تأهيل", owner: "سارة" },
  { id: "D-1004", client: "عيادة الشفاء", activity: "عيادة", area: 160, value: 14200, stage: "مكسوب", owner: "ريم" },
  { id: "D-1005", client: "ورشة المحركات", activity: "ورشة", area: 480, value: 31000, stage: "جديد", owner: "خالد" },
];

export const jobs: Job[] = [
  { id: "JOB-25-0420", client: "مطعم الذواقة", activity: "مطعم", area: 220, systems: ["إنذار", "إطفاء", "تهوية مطبخ"], status: "قيد التنفيذ", consultant: "م. فهد", updatedAt: "قبل ساعتين" },
  { id: "JOB-25-0418", client: "مستودع النخبة", activity: "مستودع", area: 1400, systems: ["إنذار", "رشاشات", "مضخات"], status: "بانتظار الفحص", consultant: "م. ليلى", updatedAt: "اليوم 10:12" },
  { id: "JOB-25-0410", client: "عيادة الشفاء", activity: "عيادة", area: 160, systems: ["إنذار", "إطفاء يدوي"], status: "تحت الدراسة", consultant: "م. فهد", updatedAt: "أمس" },
  { id: "JOB-25-0399", client: "ورشة المحركات", activity: "ورشة", area: 480, systems: ["إنذار", "إطفاء", "تهوية"], status: "مكتمل", consultant: "م. ليلى", updatedAt: "قبل 3 أيام" },
];

export const purchases: Purchase[] = [
  { id: "P-501", jobId: "JOB-25-0420", supplier: "مؤسسة الإنذار الحديث", item: "إنذار", amount: 6200, vat: 930, hasInvoice: true },
  { id: "P-502", jobId: "JOB-25-0420", supplier: "إطفاء الخليج", item: "إطفاء", amount: 4800, vat: 720, hasInvoice: true },
  { id: "P-503", jobId: "JOB-25-0418", supplier: "تهوية المستقبل", item: "تهوية", amount: 9100, vat: 1365, hasInvoice: false },
];

export const technicians: Technician[] = [
  { id: "T-01", name: "عبدالله م.", role: "فني إنذار", jobId: "JOB-25-0420", days: 4, dailyWage: 350 },
  { id: "T-02", name: "ياسر ك.", role: "فني إطفاء", jobId: "JOB-25-0420", days: 3, dailyWage: 380 },
  { id: "T-03", name: "ماجد س.", role: "فني تمديدات", jobId: "JOB-25-0418", days: 6, dailyWage: 320 },
];

export const obstacles: ObstacleLog[] = [
  { id: "O-1", jobId: "JOB-25-0420", date: "2026-06-21", note: "تأخر تسليم لوحة الإنذار من المورد", hasSignature: true },
  { id: "O-2", jobId: "JOB-25-0418", date: "2026-06-22", note: "حاجة لإعادة معاينة مسار الرشاشات", hasSignature: false },
];

// محرك التحليل الإجرائي — قواعد مبسطة للنموذج
export function analyzeRequirements(activity: string, area: number): string[] {
  const reqs: string[] = ["نظام إنذار حريق معتمد"];
  if (area > 150) reqs.push("نظام إطفاء (طفايات + بكرات خراطيم)");
  if (area > 500) reqs.push("شبكة رشاشات مائية تلقائية");
  if (area > 1000) reqs.push("مضخات حريق ومصدر مياه مخصص");
  if (/مطعم|مطبخ/.test(activity)) reqs.push("نظام إطفاء مطابخ + تهوية");
  if (/مستودع|ورشة/.test(activity)) reqs.push("مخارج طوارئ إضافية وإنارة طوارئ");
  if (/صالة|مناسبات/.test(activity)) reqs.push("مخططات إخلاء معتمدة وسعة استيعابية");
  return reqs;
}


// ── الشات الداخلي (بديل الواتساب) ──
export interface ChatChannel {
  id: string;
  jobId: string;
  title: string;
  unread: number;
  members: string[];
}
export interface ChatMessage {
  id: string;
  channelId: string;
  author: string;
  role: "العميل" | "مبيعات" | "استشاري" | "تنفيذ";
  text: string;
  time: string;
  me?: boolean;
}

export const channels: ChatChannel[] = [
  { id: "CH-1", jobId: "JOB-25-0420", title: "مطعم الذواقة", unread: 2, members: ["العميل", "سارة (مبيعات)", "م. فهد", "عزّام"] },
  { id: "CH-2", jobId: "JOB-25-0418", title: "مستودع النخبة", unread: 0, members: ["العميل", "خالد (مبيعات)", "م. ليلى", "عزّام"] },
  { id: "CH-3", jobId: "JOB-25-0410", title: "عيادة الشفاء", unread: 5, members: ["العميل", "ريم (مبيعات)", "م. فهد"] },
];

export const messages: ChatMessage[] = [
  { id: "M1", channelId: "CH-1", author: "العميل", role: "العميل", text: "السلام عليكم، متى موعد المعاينة الميدانية؟", time: "09:12" },
  { id: "M2", channelId: "CH-1", author: "م. فهد", role: "استشاري", text: "وعليكم السلام، تم اعتماد المتطلبات. الزيارة غداً الساعة 11 صباحاً.", time: "09:18" },
  { id: "M3", channelId: "CH-1", author: "عزّام", role: "تنفيذ", text: "جهّزت الفنيين ولوحة الإنذار وصلت من المورد. سنبدأ التمديدات بعد المعاينة.", time: "09:25", me: true },
  { id: "M4", channelId: "CH-1", author: "العميل", role: "العميل", text: "ممتاز، بانتظاركم. شكراً لكم.", time: "09:30" },
  { id: "M5", channelId: "CH-2", author: "خالد (مبيعات)", role: "مبيعات", text: "تم إرسال عرض السعر المحدّث للمستودع.", time: "أمس" },
  { id: "M6", channelId: "CH-3", author: "ريم (مبيعات)", role: "استشاري", text: "نحتاج رخصة البناء لإكمال التحليل.", time: "08:40" },
];


// ── محرك المخططات التحليلية للربحية ──
export interface JobFinance {
  jobId: string;
  client: string;
  revenue: number;
  cost: number;
}
export const jobFinance: JobFinance[] = [
  { jobId: "JOB-25-0420", client: "مطعم الذواقة", revenue: 18500, cost: 11800 },
  { jobId: "JOB-25-0418", client: "مستودع النخبة", revenue: 96000, cost: 71200 },
  { jobId: "JOB-25-0410", client: "عيادة الشفاء", revenue: 14200, cost: 8600 },
  { jobId: "JOB-25-0399", client: "ورشة المحركات", revenue: 31000, cost: 24500 },
];
export const monthlyRevenue: { month: string; value: number }[] = [
  { month: "يناير", value: 210 }, { month: "فبراير", value: 245 },
  { month: "مارس", value: 198 }, { month: "أبريل", value: 312 },
  { month: "مايو", value: 356 }, { month: "يونيو", value: 412 },
];
