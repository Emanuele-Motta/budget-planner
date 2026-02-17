#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[1/5] Verifica file .env"
if [[ ! -f .env ]]; then
  cp .env.example .env
  echo "Creato .env da .env.example"
else
  echo ".env già presente"
fi

echo "[2/5] Avvio PostgreSQL con Docker Compose (se disponibile)"
if command -v docker >/dev/null 2>&1; then
  docker compose up -d postgres
else
  echo "Docker non trovato: assicurati che PostgreSQL sia avviato manualmente."
fi

echo "[3/5] Prisma generate"
npm run prisma:generate -w server

echo "[4/5] Sincronizzazione schema DB (prisma db push)"
npm run prisma:push -w server

echo "[5/5] Seed categorie demo"
npm run prisma:seed -w server

echo "Setup locale completato ✅"
echo "Ora puoi avviare tutto con: npm run dev"
