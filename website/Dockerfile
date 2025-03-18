FROM oven/bun:slim AS base

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile --production --ignore-scripts

FROM base AS builder

RUN bun install --frozen-lockfile --ignore-scripts

COPY . .

RUN bun run build

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=base /app/package.json ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=builder /app/build/ ./build
COPY --from=builder /app/data/ ./data

EXPOSE 3000

CMD ["npm", "run", "start"]
