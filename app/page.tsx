"use client";
import { useState } from "react";
import PetForm from "@/components/PetForm";
import SymptomChecker from "@/components/SymptomChecker";
import type { Pet, SymptomsInput, TriageResult, CaseEntry } from "@/lib/storage";
import { saveCase } from "@/lib/storage";
import { isPro } from "@/lib/pro";
import { exportCasePDF } from "@/lib/pdf";
import { whatsappUrlFromCase, calendlyUrl } from "@/lib/tele";

export default function Home() {
  const [pet, setPet] = useState<Pet>({ name:"", species:"dog", ageYears:1, weightKg:10 });
  const [symptoms, setSymptoms] = useState<SymptomsInput | null>(null);
  const [result, setResult] = useState<TriageResult | null>(null);
  const [lastEntry, setLastEntry] = useState<CaseEntry | null>(null);
  const canSave = Boolean(result && symptoms);

  const handleAnalyze = (r: TriageResult, s: SymptomsInput) => { setResult(r); setSymptoms(s); };

  const handleSave = () => {
    if (!result || !symptoms) return;
    const entry: CaseEntry = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), pet, symptoms, result };
    saveCase(entry); setLastEntry(entry); alert("Caso salvo no histórico deste navegador.");
  };

  const handlePDF = () => {
    const entry = lastEntry || (result && symptoms ? ({ id: crypto.randomUUID(), createdAt: new Date().toISOString(), pet, symptoms, result } as CaseEntry) : null);
    if (!entry) return; if (!isPro()) { alert("Recurso Pro. Ative em /pro."); return; } exportCasePDF(entry);
  };

  return (
    <main className="container space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">PetCare – Triagem Inteligente (MVP)</h1>
        <nav className="text-sm flex gap-3 opacity-80">
          <a href="/history">Histórico</a>
          <a href="/pro">Pro</a>
          <a href="/privacy">Privacidade</a>
          <a href="/terms">Termos</a>
        </nav>
      </header>

      <section className="card space-y-3">
        <h2 className="font-medium">Dados do pet</h2>
        <PetForm pet={pet} onChange={setPet} />
      </section>

      <section className="card space-y-3">
        <h2 className="font-medium">Sintomas</h2>
        <SymptomChecker onResult={(r, s) => handleAnalyze(r, s)} />
      </section>

      {result && (
        <section className="card space-y-3">
          <h2 className="font-medium">Resultado da triagem</h2>
          <p className="text-lg">
            Nível:{" "}
            <strong className={
              result.level === "grave" ? "text-red-600" :
              result.level === "moderado" ? "text-yellow-600" : "text-green-600"
            }>
              {result.level.toUpperCase()}
            </strong>
          </p>
          <p className="mt-2 text-sm">Motivos: {result.rationale.join(" · ") || "—"}</p>
          <ul className="mt-2 list-disc pl-5 text-sm">
            {result.firstAid.map((x,i)=>(<li key={i}>{x}</li>))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-2">
            <button className="btn" onClick={handleSave} disabled={!canSave}>Salvar no histórico</button>
            <button className="btn" onClick={handlePDF} disabled={!result}>Exportar PDF {isPro() ? "" : "(Pro)"}</button>
            {canSave && lastEntry && (<>
              <a className="btn" href={whatsappUrlFromCase(lastEntry)} target="_blank">WhatsApp</a>
              <a className="btn" href={calendlyUrl()} target="_blank">Calendly</a>
            </>)}
          </div>
        </section>
      )}

      <footer className="pt-2 text-xs opacity-70">
        Este app não substitui avaliação veterinária. Em sinais de risco, procure emergência 24h.
      </footer>
    </main>
  );
}
