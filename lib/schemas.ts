import { z } from "zod";
export const SymptomsSchema = z.object({
  durationHours: z.number().min(0).max(720),
  vomiting: z.boolean(), diarrhea: z.boolean(), notEating: z.boolean(), lethargy: z.boolean(),
  bleeding: z.boolean(), laboredBreathing: z.boolean(), seizures: z.boolean(),
  painScore: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
  feverC: z.number().min(35).max(42).optional()
});
export const CaseSchema = z.object({
  pet: z.object({
    name: z.string().max(80).optional(),
    species: z.enum(["dog","cat"]),
    ageYears: z.number().min(0).max(30),
    weightKg: z.number().min(0).max(120)
  }),
  symptoms: SymptomsSchema,
  result: z.object({
    level: z.enum(["grave","moderado","leve"]),
    rationale: z.array(z.string()),
    firstAid: z.array(z.string()),
    recommend: z.enum(["ER-now","Vet-24h","Tele-vet","Home-care"])
  })
});
