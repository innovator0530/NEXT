# Install dependencies only when needed
FROM node:14.18.1-alpine3.14 AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache ffmpeg imagemagick mongodb-tools file
WORKDIR /app
RUN apk add --no-cache make gcc g++ python3

# get the package json and install it
COPY package.json package-lock.json ./
RUN npm install

# rebuild bcrypt (and maybe any other source modules) and remove their building deps
RUN npm rebuild bcrypt --build-from-source && \
  apk del make gcc g++ python3

# Rebuild the source code only when needed
FROM node:14.18.1-alpine3.14 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN cp .env.production-alpha .env.production
RUN npm run nextbuild

# Production image, copy all the files and run next
FROM node:14.18.1-alpine3.14 AS runner
RUN apk add --no-cache ffmpeg imagemagick mongodb-tools file
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

COPY --from=builder --chown=nextjs:nodejs /app/ ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "run","start:alpha"]