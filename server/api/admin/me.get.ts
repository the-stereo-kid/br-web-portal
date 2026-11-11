export default defineEventHandler(async (event) => ({ email: await requireAdmin(event) }))
