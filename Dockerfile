FROM node:18-slim AS builder
WORKDIR /app

# Install build-time dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

FROM node:18-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# Create non-root user
RUN groupadd -r app && useradd -r -g app app || true

# Copy only what's necessary from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Install production dependencies (smaller image)
RUN npm ci --omit=dev

# Ensure proper permissions and run as non-root
RUN chown -R app:app /app
USER app

EXPOSE 3000
CMD ["npm", "start"]
