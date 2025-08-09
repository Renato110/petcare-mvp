import type { CaseEntry } from "./storage";
export function whatsappUrlFromCase(entry: CaseEntry) {
  const tel = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "";
  const msg = [
    "Olá! Quero atendimento para meu pet.",
    `Nível: ${entry.result.level.toUpperCase()} (${entry.result.recommend})`,
    `Motivos: ${entry.result.rationale.join(" · ") || "—"}`,
    `Duração: ${entry.symptoms.durationHours}h · Dor: ${entry.symptoms.painScore}/3 · Febre: ${entry.symptoms.feverC ?? "—"}°C`,
    `Pet: ${entry.pet.name || "(sem nome)"} · ${entry.pet.species} · ${entry.pet.weightKg}kg`
  ].join("\n");
  return `https://wa.me/${tel}?text=${encodeURIComponent(msg)}`;
}
export function calendlyUrl() { return process.env.NEXT_PUBLIC_CALENDLY_URL || "#"; }
