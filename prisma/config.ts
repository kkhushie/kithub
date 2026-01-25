// prisma/config.ts
import { defineConfig } from '@prisma/client'

export default defineConfig({
  directUrl: process.env.DATABASE_URL,
})