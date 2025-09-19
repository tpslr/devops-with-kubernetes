
# 1. Dependencies layer
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# 2. Build layer
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# 3. app runtime layer
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
# Copy only what is needed for runtime
COPY package*.json ./
COPY static ./static
COPY --from=deps /app/node_modules ./node_modules
# Remove dev dependencies
RUN npm prune --omit=dev
COPY --from=build /app/dist ./dist

USER node

CMD ["node", "."]