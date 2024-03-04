FROM node:20-alpine

ARG DATABASE_URL

ENV DATABASE_URL=$DATABASE_URL

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install -g pnpm

RUN pnpm i -P

RUN npx prisma generate

RUN npx prisma db seed

RUN pnpm build

EXPOSE 4000

CMD ["node", "./dist/src/main.js"]
