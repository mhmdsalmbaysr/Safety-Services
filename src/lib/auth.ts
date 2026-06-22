export const SESSION_COOKIE = "ss_session";

export const ROLES = [
  { id: "admin", label: "الإدارة العليا (SaaS)" },
  { id: "sales", label: "المبيعات والعمليات" },
  { id: "consultant", label: "المهندس الاستشاري" },
  { id: "execution", label: "مسؤول التنفيذ (عزّام)" },
] as const;

export type RoleId = (typeof ROLES)[number]["id"];

export interface Session {
  role: RoleId;
  name: string;
  company: string;
}

export function readSession(raw?: string): Session | null {
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw)) as Session;
  } catch {
    return null;
  }
}
