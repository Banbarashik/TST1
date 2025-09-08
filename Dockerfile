# syntax=docker/dockerfile:1

##############################
# 1) Deps (dev+prod для сборки)
##############################
FROM node:20-alpine AS deps
WORKDIR /app

# Нужен только на сборке, если есть нативные модули
RUN apk add --no-cache libc6-compat

# Corepack только здесь
RUN corepack enable

COPY package.json pnpm-lock.yaml .npmrc* ./
RUN pnpm install --frozen-lockfile

##############################
# 2) Builder
##############################
FROM node:20-alpine AS builder
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    NEXT_DISABLE_SOURCEMAPS=1

# Нужен только на сборке, если есть нативные модули
RUN apk add --no-cache libc6-compat
RUN corepack enable

# node_modules с dev-зависимостями — только для сборки
COPY --from=deps /app/node_modules ./node_modules
# Остальной код
COPY . .

# Сборка Next (standalone)
RUN pnpm build && rm -rf .next/cache

##############################
# 3) Runtime (минимальный)
##############################
FROM node:20-alpine AS runner
WORKDIR /app

# Без libc6-compat — рантайм чище и меньше
# Пользователь non-root
RUN addgroup -g 1001 -S nodejs && adduser -u 1001 -S nextjs -G nodejs

ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=3000 \
    NEXT_TELEMETRY_DISABLED=1

# Копируем только то, что нужно рантайму
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]