export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const email = readLogin(String(getQuery(event).token || ''), config.sessionPassword)
  if (!email || !adminEmails().includes(email)) return sendRedirect(event, '/admin/login?expired=1')

  const session = await adminSession(event)
  await session.update({ email })
  return sendRedirect(event, '/admin')
})
