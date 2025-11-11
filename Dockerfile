## Multi-stage Dockerfile for building a TypeScript + Express API
## - builder stage installs dev deps and builds the TypeScript into /app/dist
## - runner stage installs only production deps and runs the compiled JS

FROM node:22 AS builder
WORKDIR /app

# Copy package manifests and install full deps (including dev) for build
COPY ./api/package*.json ./
RUN npm ci

# Copy source and build
COPY ./api ./
RUN npm run build

FROM node:22-slim AS runner
WORKDIR /app

# Use production environment
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Copy only production dependencies and the built artifacts
COPY ./api/package*.json ./
RUN npm ci --only=production

# Copy compiled output from builder
COPY --from=builder /app/dist ./dist

# If you need other runtime files (config, locales...), copy them explicitly
# COPY --from=builder /app/config ./config


# Build-time arguments (populated by CI via --build-arg)
ARG PORT
ARG ACCESS_TOKEN_SECRET
ARG DB_HOST
ARG DB_PORT
ARG DB_USER
ARG DB_PASSWORD
ARG DB_NAME

# Write a runtime .env from build args (if provided) and export as ENV vars
RUN printf "PORT=%s\nACCESS_TOKEN_SECRET=%s\nDB_HOST=%s\nDB_PORT=%s\nDB_USER=%s\nDB_PASSWORD=%s\nDB_NAME=%s\n" \
	"${PORT:-}" "${ACCESS_TOKEN_SECRET:-}" "${DB_HOST:-}" "${DB_PORT:-}" "${DB_USER:-}" "${DB_PASSWORD:-}" "${DB_NAME:-}" > /app/.env || true

# Also set ENV variables from the build args (so node can read them at runtime)
ENV PORT=${PORT}
ENV ACCESS_TOKEN_SECRET=${ACCESS_TOKEN_SECRET}
ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_NAME=${DB_NAME}

# Expose default port (can be overridden with -e PORT=... when running)
EXPOSE 3000

# Prefer the non-root user provided by the node image
USER node

CMD ["node", "dist/index.js"]