FROM oven/bun:latest AS base

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile --production --ignore-scripts

FROM base AS builder

RUN bun install --frozen-lockfile --ignore-scripts

COPY . .

RUN bun run build

FROM oven/bun:slim AS production

WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/*.md ./data
COPY --from=builder /app/build/ ./build

EXPOSE 3000

CMD ["remix-serve", "./build/server/index.js"]
