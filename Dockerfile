FROM node:20-alpine

WORKDIR /app

# 1. Copy package.json and Prisma schema
COPY package*.json ./
COPY prisma ./prisma

# 2. Install dependencies (Prisma postinstall runs here)
RUN npm install

# 3. Generate Prisma client explicitly (optional but safe)
RUN npx prisma generate

# 4. Copy the rest of the source code
COPY . .

# 5. Build NestJS
RUN npm run build

EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && if [ \"$RUN_SEEDS\" = \"true\" ]; then npx prisma db seed; fi && node dist/src/main.js"]

