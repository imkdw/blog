FROM node:20-alpine

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install -g pnpm

RUN pnpm i -P

RUN npx prisma generate

RUN pnpm build

EXPOSE 4000

CMD ["node", "./dist/src/main.js"]
