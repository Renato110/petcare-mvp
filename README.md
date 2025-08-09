# PetCare – MVP (Triagem Inteligente para Pets)

Triagem de sintomas (cães/gatos) com orientações iniciais, histórico local, PDF (Pro) e teleconsulta.

## Rodar local
```bash
npm install
npm run dev
# http://localhost:3000
```

## Variáveis de ambiente (.env.local)
```
NEXT_PUBLIC_PRO_CODE=VIAFISIO-PRO-2025
NEXT_PUBLIC_WHATSAPP_PHONE=5562999999999
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/sua-agenda/teleconsulta
```

## Publicação
- **Lovable → Publish** ou **Vercel** (Import Project).

## Segurança
- Sem backend no MVP: dados ficam no navegador (localStorage).
- Middleware adiciona cabeçalhos de segurança (CSP, XFO, etc.).
- Para sincronizar com servidor de forma segura (LGPD):
  - Use **Supabase** (Postgres com RLS) ou backend próprio.
  - Habilite Auth (Supabase Auth/NextAuth) e armazene somente o mínimo necessário.
  - Veja `lib/schemas.ts` como base para validação.
  - Criptografe PII sensível no banco (pgcrypto).

## Roadmap
- [ ] Autenticação + Supabase (RLS)
- [ ] Sincronizar histórico multi-dispositivo
- [ ] Checkout (Stripe/MercadoPago) para Pro
- [ ] IA de triagem (substituir heurística)
