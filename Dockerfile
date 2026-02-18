FROM node:18-alpine AS base
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --production

# Copy source
COPY . .

# Build the app
RUN npm run build

# Run stage
FROM node:18-alpine AS run
WORKDIR /app
ENV NODE_ENV=production
COPY --from=base /app .

EXPOSE 3000
CMD ["npm", "start"]
