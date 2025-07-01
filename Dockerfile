FROM docker.arvancloud.ir/node:22-alpine AS base
RUN apk add --no-cache libc6-compat
RUN npm install --global corepack@latest 
RUN corepack enable pnpm

FROM base AS deps

WORKDIR /app
COPY package*.json pnpm-lock.yaml* ./
RUN pnpm i

FROM base AS builder

WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM base AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]