// src/lib/db.ts
// import { PrismaClient } from '@prisma/client/edge' // ← Use edge runtime for Next.js

import { PrismaClient } from "@prisma/client/extension"

// For development, you can also use the regular client:
// import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? 
  new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
    // Optional: Add logging for debugging
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma