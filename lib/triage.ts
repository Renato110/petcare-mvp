export type Pet = { name: string; species: "dog" | "cat"; ageYears: number; weightKg: number; };
export type SymptomsInput = {
  durationHours: number; vomiting: boolean; diarrhea: boolean; notEating: boolean; lethargy: boolean;
  bleeding: boolean; laboredBreathing: boolean; seizures: boolean; painScore: 0|1|2|3; feverC?: number;
};
export type TriageResult = {
  level: "grave" | "moderado" | "leve"; rationale: string[]; firstAid: string[];
  recommend: "ER-now" | "Vet-24h" | "Tele-vet" | "Home-care";
};
export function triage(pet: Pet, s: SymptomsInput): TriageResult {
  const reasons: string[] = []; let score = 0;
  if (s.seizures) { score += 4; reasons.push("Convulsões"); }
  if (s.laboredBreathing) { score += 4; reasons.push("Respiração difícil"); }
  if (s.bleeding) { score += 3; reasons.push("Sangramento"); }
  if (s.vomiting) { score += 1; reasons.push("Vômitos"); }
  if (s.diarrhea) { score += 1; reasons.push("Diarreia"); }
  if (s.notEating) { score += 1; reasons.push("Anorexia"); }
  if (s.lethargy) { score += 1; reasons.push("Letargia"); }
  score += s.painScore;
  if (s.durationHours >= 24) score += 1;
  if (s.durationHours >= 72) score += 2;
  if (s.feverC && s.feverC >= 39.5) { score += 2; reasons.push(`Febre ${s.feverC}°C`); }
  let level: TriageResult["level"] = "leve"; let recommend: TriageResult["recommend"] = "Home-care";
  if (score >= 6 || s.laboredBreathing || s.seizures) { level = "grave"; recommend = "ER-now"; }
  else if (score >= 3) { level = "moderado"; recommend = "Vet-24h"; }
  else { if (s.vomiting || s.diarrhea || s.notEating) recommend = "Tele-vet"; }
  const firstAid: string[] = [];
  if (s.vomiting || s.diarrhea) firstAid.push("Ofereça água em pequenas quantidades frequentes.");
  if (s.notEating) firstAid.push("Evite forçar comida; observe ingestão de água.");
  if (s.lethargy) firstAid.push("Deixe em local calmo; monitore respiração.");
  if (s.bleeding) firstAid.push("Compressão suave com gaze limpa; não use pomadas humanas.");
  if (s.laboredBreathing) firstAid.push("Evite estresse e calor; não force deitar.");
  if (s.painScore >= 2) firstAid.push("Não administre analgésicos humanos. Procure orientação veterinária.");
  if (firstAid.length === 0) firstAid.push("Monitore por 6–12h e evite mudanças bruscas na dieta.");
  return { level, rationale: reasons, firstAid, recommend };
}
