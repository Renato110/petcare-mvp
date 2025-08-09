"use client";
import type { Pet } from "@/lib/triage";
export default function PetForm({ pet, onChange }:{ pet: Pet; onChange: (p: Pet)=>void }) {
  return (
    <div className="grid sm:grid-cols-4 gap-3">
      <Field label="Nome"><input className="input" value={pet.name} onChange={e=>onChange({...pet, name: e.target.value})}/></Field>
      <Field label="Espécie">
        <select className="input" value={pet.species} onChange={e=>onChange({...pet, species: e.target.value as Pet['species']})}>
          <option value="dog">Cão</option><option value="cat">Gato</option>
        </select>
      </Field>
      <Field label="Idade (anos)"><input type="number" min={0} step={0.1} className="input" value={pet.ageYears}
        onChange={e=>onChange({...pet, ageYears: Number(e.target.value)})}/></Field>
      <Field label="Peso (kg)"><input type="number" min={0} step={0.1} className="input" value={pet.weightKg}
        onChange={e=>onChange({...pet, weightKg: Number(e.target.value)})}/></Field>
    </div>
  );}
function Field({label, children}:{label:string; children: React.ReactNode}) {
  return (<label className="text-sm"><span className="block mb-1">{label}</span>{children}</label>);
}
