# Budget Planner Monorepo

Web app full-stack per gestione finanze personali (React + Express + Prisma + PostgreSQL + AI OpenAI).

## Struttura

- `client`: frontend React 18 + TS + Vite + MUI + Zustand + React Query + Recharts + i18n + PWA.
- `server`: backend Node.js/Express + TS + Prisma + JWT refresh + Zod + rate limiting.
- `shared`: tipi condivisi.

## Setup consigliato: Supabase DB + Netlify frontend

## 1) Database Supabase (Postgres)

1. Crea un progetto su Supabase.
2. Copia le connection string Postgres:
   - **Pooler URL** (porta `6543`) -> `DATABASE_URL`
   - **Direct URL** (porta `5432`) -> `DIRECT_URL`
3. Crea `.env` da esempio e incolla i valori:

```bash
cp .env.example .env
```

## 2) Avvio locale backend + frontend

```bash
npm install
npm run setup:local
npm run dev
```

`setup:local`:
- carica `.env`,
- sincronizza `server/.env` per Prisma,
- se rileva Supabase **non avvia** Postgres Docker locale,
- esegue `prisma generate`, `prisma db push`, seed.

## 3) Deploy frontend su Netlify

Questa repo include `netlify.toml` già configurato per SPA.

### Variabile ambiente Netlify (obbligatoria)
Nel sito Netlify imposta:
- `VITE_API_URL=https://api.tuodominio.com/api`

### Build settings
- Build command: `npm run build`
- Publish directory: `client/dist`

(`netlify.toml` lo imposta già automaticamente.)


### Config rapida con i tuoi valori Supabase

Se vuoi usare i valori che hai condiviso, imposta nel frontend (Netlify o `.env` client):

```env
VITE_SUPABASE_URL=https://nstqamvjmhlmpjsubvhc.supabase.co
VITE_SUPABASE_KEY=sb_publishable_olcPVYG2CKVfA0Z6GrPSow_d0cjjRhQ
```

Con questa configurazione il client userà automaticamente `https://nstqamvjmhlmpjsubvhc.supabase.co/functions/v1/api` come base URL API (fallback quando `VITE_API_URL` non è impostata).

### Troubleshooting Netlify login (`ERR_CONNECTION_REFUSED`)
Se vedi richieste verso `http://localhost:4000` su Netlify, imposta in Netlify:
- `VITE_API_URL=https://api.tuodominio.com/api`

Dopo il cambio, rilancia un deploy (Clear cache and deploy site).

Se invece vedi `404` su `/api/*`, significa che il frontend è online ma il backend non è esposto sotto lo stesso dominio: configura `VITE_API_URL` verso il dominio pubblico delle API.

## 4) Deploy backend (API)

Netlify in questo setup ospita il frontend; il backend Express va pubblicato su un servizio server/container (Render, Railway, Fly.io, VPS Docker, ecc.).

Variabili richieste backend:
- `DATABASE_URL`
- `DIRECT_URL` (consigliata)
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `OPENAI_API_KEY` (opzionale)
- `CLIENT_URL=https://<tuo-sito-netlify>.netlify.app`

## 5) Verifica finale

- Frontend: `https://<tuo-sito>.netlify.app`
- API: `https://api.tuodominio.com/health`

---

## Opzione deploy Docker completa (alternativa)

Se vuoi deployare tutto su un unico server Docker:

```bash
cp .env.prod.example .env.prod
npm run deploy:up
```

Comandi utili:

```bash
npm run deploy:logs
npm run deploy:down
```

---

## Esempi API

### Register
`POST /api/auth/register`

```json
{ "email": "mario@example.com", "password": "Password123", "fullName": "Mario Rossi" }
```

### Login
`POST /api/auth/login`

```json
{ "email": "demo@budgetplanner.it", "password": "password123" }
```

### Create transaction
`POST /api/transactions`

```json
{
  "accountId": "UUID",
  "type": "EXPENSE",
  "amount": 45.2,
  "currency": "EUR",
  "date": "2026-01-11",
  "tags": ["cena", "ristorante"]
}
```
