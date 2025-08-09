"use client";
import { useState } from "react";
import { isPro, tryActivatePro, deactivatePro } from "@/lib/pro";
export default function ProPage() {
  const [code, setCode] = useState(""); const [status, setStatus] = useState(isPro());
  const onSubmit = () => { const ok = tryActivatePro(code); setStatus(ok); if (!ok) alert("Código inválido."); };
  return (
    <main className="container space-y-4">
      <h1 className="text-xl font-semibold">Ativar Pro</h1>
      {status ? (
        <div className="space-y-3">
          <p className="text-sm">Plano Pro ativo neste navegador.</p>
          <button className="btn" onClick={()=>{ deactivatePro(); setStatus(false); }}>Desativar</button>
        </div>
      ) : (
        <div className="space-y-3">
          <label className="text-sm block">Código de acesso
            <input className="input mt-1" value={code} onChange={e=>setCode(e.target.value)} />
          </label>
          <button className="btn" onClick={onSubmit}>Ativar</button>
        </div>
      )}
      <a className="text-sm underline opacity-80" href="/">Voltar</a>
    </main>
  );
}
