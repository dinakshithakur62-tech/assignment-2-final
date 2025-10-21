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
# 🚀 Production Stage (Fixed)
# ---------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=80


# ✅ Create user with a proper home directory
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 --home /home/nextjs nextjs

# ✅ Set home env and permissions
ENV HOME=/home/nextjs
RUN mkdir -p $HOME && chown -R nextjs:nodejs /app $HOME

# ✅ Copy necessary app artifacts
#COPY --from=builder /app/.next/standalone ./
#COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

USER nextjs
EXPOSE 80

# ✅ Run migrations and start app
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
