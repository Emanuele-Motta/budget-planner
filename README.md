# Budget Planner Monorepo

Web app full-stack per gestione finanze personali (React + Express + Prisma + PostgreSQL + AI OpenAI).

## Struttura

- `client`: frontend React 18 + TS + Vite + MUI + Zustand + React Query + Recharts + i18n + PWA.
- `server`: backend Node.js/Express + TS + Prisma + JWT refresh + Zod + rate limiting.
- `shared`: tipi condivisi.

## Avvio locale semplificato (consigliato)

### 1) Installa dipendenze (una sola volta)

```bash
npm install
```

### 2) Setup automatico ambiente locale

```bash
npm run setup:local
```

Questo comando:
- crea `.env` da `.env.example` se manca,
- carica le variabili ambiente dal file `.env`,
- crea `server/.env` con `DATABASE_URL` per compatibilità Prisma,
- avvia PostgreSQL con Docker (`postgres`),
- genera il client Prisma,
- sincronizza lo schema DB con `prisma db push`,
- esegue il seed categorie demo.

### 3) Avvia frontend + backend

```bash
npm run dev
```

Oppure in un solo comando (setup + avvio):

```bash
npm run dev:local
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

---

## Pubblicazione app (production)

Questa repo include una pipeline Docker pronta per pubblicare l'app su VPS/cloud.

### Prerequisiti
- Docker + Docker Compose installati sul server.
- Porta `80` aperta sul firewall.
- (Opzionale consigliato) dominio DNS che punta al server.

### 1) Copia env production

```bash
cp .env.prod.example .env.prod
```

Compila i valori in `.env.prod` (password e secret forti).

### 2) Build + deploy

```bash
npm run deploy:up
```

Questo comando avvia:
- `postgres` (database),
- `server` (API Node/Express + Prisma),
- `client` (Nginx che serve frontend e proxy `/api`).

### 3) Verifica

```bash
npm run deploy:logs
```

Apri browser su:
- `http://IP_DEL_SERVER`
- oppure `http://tuo-dominio`

### Comandi utili

```bash
npm run deploy:down
```

---

## HTTPS (raccomandato)

Per usare l'app in modo sicuro, metti davanti un reverse proxy con TLS (es. Caddy o Nginx + Certbot) oppure usa un provider che gestisce SSL automaticamente.

---

## Modalità manuale locale (alternativa)

```bash
cp .env.example .env
docker compose up -d postgres
npm run prisma:generate -w server
npm run prisma:push -w server
npm run prisma:seed -w server
npm run dev
```

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
