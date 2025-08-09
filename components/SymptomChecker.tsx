"use client";
import { useState } from "react";
import type { SymptomsInput, TriageResult } from "@/lib/storage";
import { triage } from "@/lib/triage";
export default function SymptomChecker({ onResult, disabled }:{ onResult: (r: TriageResult, s: SymptomsInput)=>void; disabled?: boolean }) {
  const [s, setS] = useState<SymptomsDefault>(defaults());
  return (
    <div className="space-y-3">
      <div className="grid sm:grid-cols-4 gap-3">
        <Num label="Duração (h)" v={s.durationHours} set={v=>upd(setS, s, {durationHours:v})} min={0}/>
        <Num label="Febre (°C)" v={s.feverC} set={v=>upd(setS, s, {feverC:v})} min={35} max={42} step={0.1}/>
        <Sel label="Dor" v={s.painScore} set={v=>upd(setS, s, {painScore:v as any})}
             opts={[["0","0"],["1","1"],["2","2"],["3","3"]]} />
      </div>
      <div className="grid sm:grid-cols-3 gap-2">
        {["vomiting","diarrhea","notEating","lethargy","bleeding","laboredBreathing","seizures"].map(k=>(
          <Chk key={k} label={labels[k]} checked={(s as any)[k]} onChange={(val:boolean)=>upd(setS,s,{[k]:val} as any)}/>
        ))}
      </div>
      <button disabled={disabled} className="btn" onClick={()=>{
        const symptoms: SymptomsInput = { ...s }; if (symptoms.feverC === undefined) delete (symptoms as any).feverC;
        const r = triage({name:"",species:"dog",ageYears:1,weightKg:10}, symptoms); onResult(r, symptoms);
      }}>Analisar</button>
    </div>
  );}
type SymptomsDefault = SymptomsInput & { feverC: number | undefined };
const labels: Record<string,string> = {
  vomiting:"Vômitos", diarrhea:"Diarreia", notEating:"Sem apetite", lethargy:"Letargia",
  bleeding:"Sangramento", laboredBreathing:"Respiração difícil", seizures:"Convulsões"
};
function defaults(): SymptomsDefault {
  return { durationHours: 12, vomiting:false, diarrhea:false, notEating:false, lethargy:false,
           bleeding:false, laboredBreathing:false, seizures:false, painScore:0, feverC: undefined };
}
function upd<T>(set:(f:(p:T)=>T)=>void, s:T, patch:Partial<T>) { set(()=>({ ...s, ...patch })); }
function Num({label,v,set,min,max,step=1}:{label:string;v:number|undefined;set:(n:number|undefined)=>void;min?:number;max?:number;step?:number}) {
  return <label className="text-sm"><span className="block mb-1">{label}</span>
    <input type="number" className="input" value={v??""} onChange={e=>set(e.target.value===""?undefined:Number(e.target.value))}
           min={min} max={max} step={step}/>
  </label>;
}
function Sel({label,v,set,opts}:{label:string;v:any;set:(n:any)=>void;opts:[string,string][]}) {
  return <label className="text-sm"><span className="block mb-1">{label}</span>
    <select className="input" value={v} onChange={e=>set(e.target.value)}>{opts.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select>
  </label>;
}
function Chk({label,checked,onChange}:{label:string;checked:boolean;onChange:(b:boolean)=>void}) {
  return <label className="text-sm inline-flex items-center gap-2">
    <input type="checkbox" className="h-4 w-4" checked={checked} onChange={e=>onChange(e.target.checked)}/>
    {label}
  </label>;
}
