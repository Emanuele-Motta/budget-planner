FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY client/package.json ./client/package.json
COPY shared/package.json ./shared/package.json
RUN npm install

COPY tsconfig.base.json ./
COPY shared ./shared
COPY client ./client

ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build -w client

FROM nginx:1.27-alpine
COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/client/dist /usr/share/nginx/html
EXPOSE 80
