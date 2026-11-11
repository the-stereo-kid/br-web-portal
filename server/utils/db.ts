import postgres from 'postgres'

let sql: ReturnType<typeof postgres> | undefined

// ponytail: one connection per serverless instance, through Neon's pooled DATABASE_URL (hence prepare: false).
// The Neon integration on Vercel was added with the prefix "DEV", so its pooled URL arrives as DEV_DATABASE_URL.
const databaseUrl = () => {
  const url = process.env.DATABASE_URL || process.env.DEV_DATABASE_URL
  if (!url) throw createError({ statusCode: 500, message: 'DATABASE_URL is not set' })
  return url
}

export const useDb = () => (sql ??= postgres(databaseUrl(), { max: 1, prepare: false, idle_timeout: 20 }))
