// Everything under /api/admin needs a signed-in admin.
export default defineEventHandler(async (event) => {
  if (event.path.startsWith('/api/admin')) await requireAdmin(event)
})
