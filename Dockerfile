FROM node:16-alpine AS base

WORKDIR /app

# Building
FROM base AS builder
RUN mkdir /uploads && chmod 777 /uploads
COPY package*.json ./
RUN npm install
COPY ./src ./src
RUN npm run prestart

# Setup App Directory
FROM base AS release
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build

# Run
CMD ["node", "--max_old_space_size=4096", "./build/app"]