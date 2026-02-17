#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[1/6] Verifica file .env"
if [[ ! -f .env ]]; then
  cp .env.example .env
  echo "Creato .env da .env.example"
else
  echo ".env già presente"
fi

echo "[2/6] Caricamento variabili ambiente da .env"
set -a
# shellcheck disable=SC1091
source ./.env
set +a

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "Errore: DATABASE_URL non impostata nel file .env"
  exit 1
fi

echo "[3/6] Sync variabili Prisma in server/.env"
{
  echo "DATABASE_URL=${DATABASE_URL}"
  if [[ -n "${DIRECT_URL:-}" ]]; then
    echo "DIRECT_URL=${DIRECT_URL}"
  fi
} > server/.env

echo "[4/6] Avvio PostgreSQL locale (solo se non usi Supabase)"
if [[ "${DATABASE_URL}" == *"supabase"* ]]; then
  echo "Rilevato Supabase: salto avvio Docker Postgres locale"
elif command -v docker >/dev/null 2>&1; then
  docker compose up -d postgres
else
  echo "Docker non trovato: assicurati che PostgreSQL sia avviato manualmente."
fi

echo "[5/6] Prisma generate"
npm run prisma:generate -w server

echo "[6/6] Sincronizzazione schema DB + seed"
npm run prisma:push -w server
npm run prisma:seed -w server

echo "Setup locale completato ✅"
echo "Ora puoi avviare tutto con: npm run dev"
