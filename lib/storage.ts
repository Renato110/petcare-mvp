import { isPro } from "./pro";
export type Pet = { name: string; species: "dog" | "cat"; ageYears: number; weightKg: number; };
export type SymptomsInput = {
  durationHours: number; vomiting: boolean; diarrhea: boolean; notEating: boolean; lethargy: boolean;
  bleeding: boolean; laboredBreathing: boolean; seizures: boolean; painScore: 0|1|2|3; feverC?: number;
};
export type TriageResult = {
  level: "grave" | "moderado" | "leve"; rationale: string[]; firstAid: string[];
  recommend: "ER-now" | "Vet-24h" | "Tele-vet" | "Home-care";
};
export type CaseEntry = { id: string; createdAt: string; pet: Pet; symptoms: SymptomsInput; result: TriageResult; };
const KEY = "petcare:history:v1";
export function loadHistory(): CaseEntry[] {
  if (typeof window === "undefined") return []; const raw = localStorage.getItem(KEY);
  if (!raw) return []; try { return JSON.parse(raw) as CaseEntry[]; } catch { return []; }
}
export function saveCase(entry: CaseEntry) {
  if (typeof window === "undefined") return; const list = loadHistory(); list.unshift(entry);
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, isPro() ? 200 : 3)));
}
export function deleteCase(id: string) {
  if (typeof window === "undefined") return; const list = loadHistory().filter(c => c.id !== id);
  localStorage.setItem(KEY, JSON.stringify(list));
}
