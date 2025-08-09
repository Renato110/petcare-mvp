const KEY = "petcare:isPro:v1";
export function isPro(): boolean { if (typeof window === "undefined") return false; return localStorage.getItem(KEY) === "1"; }
export function tryActivatePro(inputCode: string): boolean {
  const code = process.env.NEXT_PUBLIC_PRO_CODE || ""; const ok = inputCode.trim() !== "" && inputCode === code;
  if (ok && typeof window !== "undefined") localStorage.setItem(KEY, "1"); return ok;
}
export function deactivatePro() { if (typeof window === "undefined") return; localStorage.removeItem(KEY); }
