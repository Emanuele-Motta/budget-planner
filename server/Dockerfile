FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY server/package.json ./server/package.json
COPY shared/package.json ./shared/package.json
RUN npm install

COPY tsconfig.base.json ./
COPY shared ./shared
COPY server ./server

RUN npm run build -w shared && npm run build -w server

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/server/package.json ./server/package.json
COPY --from=builder /app/shared/package.json ./shared/package.json
RUN npm install --omit=dev

COPY --from=builder /app/server/prisma ./server/prisma
COPY --from=builder /app/server/dist ./server/dist

EXPOSE 4000
CMD ["sh", "-c", "cd server && npx prisma db push && node dist/index.js"]
