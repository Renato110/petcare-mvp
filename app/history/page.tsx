"use client";
import { useEffect, useState } from "react";
import { loadHistory, deleteCase, type CaseEntry } from "@/lib/storage";
import { exportCasePDF } from "@/lib/pdf";
import { isPro } from "@/lib/pro";

export default function HistoryPage() {
  const [items, setItems] = useState<CaseEntry[]>([]);
  const refresh = () => setItems(loadHistory());
  useEffect(() => { refresh(); }, []);

  return (
    <main className="container space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Histórico</h1>
        <a className="text-sm underline opacity-80" href="/">Voltar</a>
      </header>

      {items.length === 0 ? (
        <p className="opacity-70 text-sm">Nenhum caso salvo neste navegador.</p>
      ) : (
        <ul className="space-y-3">
          {items.map(it => (
            <li key={it.id} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">
                    {it.pet.name || "(sem nome)"} · {it.pet.species === "dog" ? "Cão" : "Gato"} · {it.result.level.toUpperCase()}
                  </div>
                  <div className="text-xs opacity-70">
                    {new Date(it.createdAt).toLocaleString()} · {it.result.recommend}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="btn" onClick={()=>{
                    if (!isPro()) { alert("PDF é recurso Pro. Ative em /pro."); return; }
                    exportCasePDF(it);
                  }}>PDF</button>
                  <button className="btn" onClick={()=>{ deleteCase(it.id); refresh(); }}>Excluir</button>
                </div>
              </div>
              {it.result.rationale.length > 0 && (
                <p className="text-xs mt-2 opacity-80">Motivos: {it.result.rationale.join(" · ")}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
