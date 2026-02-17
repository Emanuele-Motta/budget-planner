# Budget Planner Monorepo

Web app full-stack per gestione finanze personali (React + Express + Prisma + PostgreSQL + AI OpenAI).

## Struttura

- `client`: frontend React 18 + TS + Vite + MUI + Zustand + React Query + Recharts + i18n + PWA.
- `server`: backend Node.js/Express + TS + Prisma + JWT refresh + Zod + rate limiting.
- `shared`: tipi condivisi.

## Avvio rapido

1. Installa dipendenze:

```bash
npm install
```

2. Copia env:

```bash
cp .env.example .env
```

3. Avvia PostgreSQL (opzionale con Docker):

```bash
docker compose up -d
```

4. Prisma:

```bash
npm run prisma:generate -w server
npm run prisma:migrate -w server -- --name init
npm run prisma:seed -w server
```

5. Esegui client + server:

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

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

### AI chat
`POST /api/ai/chat`

```json
{ "question": "Come posso risparmiare di più questo mese?" }
```

## Note production

- Aggiungere storage cloud per allegati ricevute.
- Aggiungere code job/cron per sync offline e transazioni ricorrenti.
- Configurare refresh token via cookie httpOnly.
- Crittografia dati sensibili server-side (es. pgcrypto/KMS).
