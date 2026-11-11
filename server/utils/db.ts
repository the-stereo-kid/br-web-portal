import postgres from 'postgres'

let sql: ReturnType<typeof postgres> | undefined

// ponytail: one connection per serverless instance, through Neon's pooled DATABASE_URL (hence prepare: false).
export const useDb = () => (sql ??= postgres(process.env.DATABASE_URL!, { max: 1, prepare: false, idle_timeout: 20 }))
