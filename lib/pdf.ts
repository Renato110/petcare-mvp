import jsPDF from "jspdf"; import type { CaseEntry } from "./storage";
export function exportCasePDF(entry: CaseEntry) {
  const doc = new jsPDF(); const line = (y: number, text: string) => { doc.text(text, 14, y); return y + 7; };
  let y = 14;
  doc.setFontSize(16); y = line(y, "PetCare – Relato de Triagem");
  doc.setFontSize(10);
  y = line(y, `Data: ${new Date(entry.createdAt).toLocaleString()}`);
  y = line(y, `Pet: ${entry.pet.name || "(sem nome)"} – ${entry.pet.species === "dog" ? "Cão" : "Gato"}`);
  y = line(y, `Idade: ${entry.pet.ageYears} anos – Peso: ${entry.pet.weightKg} kg`);
  y = line(y, "—");
  y = line(y, `Nível: ${entry.result.level.toUpperCase()} | Conduta: ${entry.result.recommend}`);
  if (entry.result.rationale.length) y = line(y, `Motivos: ${entry.result.rationale.join(" · ")}`);
  y = line(y, "Primeiros cuidados:"); entry.result.firstAid.forEach(f => { y = line(y, `• ${f}`); });
  y = line(y, "—"); const s = entry.symptoms;
  const flags = ["vomiting","diarrhea","notEating","lethargy","bleeding","laboredBreathing","seizures"] as const;
  y = line(y, `Duração: ${s.durationHours} h | Dor: ${s.painScore}/3 | Febre: ${s.feverC ?? "—"} °C`);
  y = line(y, `Sinais: ${flags.filter(k => (s as any)[k]).join(", ") || "nenhum"}`);
  doc.save(`petcare-${entry.pet.name || "caso"}-${entry.createdAt.slice(0,10)}.pdf`);
}
