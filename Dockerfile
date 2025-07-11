# syntax=docker/dockerfile:1

##############################
# 1. Base image
##############################
FROM node:18-alpine AS base

# Create app directory
WORKDIR /app

# Add libc6 for glibc compatibility (used by some native Node modules)
RUN apk add --no-cache libc6-compat

##############################
# 2. Dependencies install
##############################
FROM base AS deps

# Enable corepack and install pnpm
RUN corepack enable

# Copy only the dependency-related files
COPY package.json pnpm-lock.yaml .npmrc* ./

# Install production AND devolopment dependencies
RUN pnpm install --frozen-lockfile

##############################
# 3. Build the app
##############################
FROM base AS builder

# Enable corepack and install pnpm
RUN corepack enable

# Copy app source
COPY . .

# Copy installed deps from previous layer
COPY --from=deps /app/node_modules ./node_modules

# Build the app
RUN pnpm build

##############################
# 4. Final image (minimal)
##############################
FROM base AS runner

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -u 1001 -S nextjs -G nodejs

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
# Uncomment to disable Next.js telemetry
# ENV NEXT_TELEMETRY_DISABLED=1

# Copy necessary build output only
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Use non-root user
USER nextjs

# Expose Next.js port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]