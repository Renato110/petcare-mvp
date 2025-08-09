import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "PetCare – Triagem Inteligente (MVP)",
  description: "Triagem de sintomas para pets com orientações iniciais.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="pt-BR"><body>{children}</body></html>);
}
