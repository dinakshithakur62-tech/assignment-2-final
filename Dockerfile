# ---------------------------
# 🧱 Base Image (Debian-based)
# ---------------------------
FROM node:20-slim AS base

WORKDIR /app

# ---------------------------
# 📦 Dependencies Layer
# ---------------------------
FROM base AS deps
# Update package lists and install openssl
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# Copy dependency files
COPY package*.json ./
COPY prisma ./prisma

# Install production + dev deps
RUN npm ci
RUN npx prisma generate

# ---------------------------
# 🏗️ Build Stage
# ---------------------------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client for Debian environment
RUN npx prisma generate

# Disable Next telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Build the Next.js app (creates .next/standalone)
RUN npm run build

# ---------------------------
# 🚀 Production Stage
# ---------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create app user for security
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Copy only required artifacts
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

# Copy all Prisma engines and dependencies
COPY --from=builder /app/node_modules ./node_modules

USER nextjs
EXPOSE 3000

# Run database migration and start server
CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]
