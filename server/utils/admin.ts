import type { H3Event } from 'h3'

export const adminEmails = () =>
  String(useRuntimeConfig().adminEmails || '')
    .toLowerCase()
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

export const adminSession = (event: H3Event) =>
  useSession<{ email?: string }>(event, {
    password: useRuntimeConfig().sessionPassword,
    name: 'br-admin',
    maxAge: 60 * 60 * 24 * 30
  })

/** The signed-in admin's email, or null. Checked against the list on every request, so removing an address locks it out. */
export async function currentAdmin(event: H3Event): Promise<string | null> {
  if (!useRuntimeConfig().sessionPassword) return null
  const { data } = await adminSession(event)
  return data.email && adminEmails().includes(data.email) ? data.email : null
}

export async function requireAdmin(event: H3Event): Promise<string> {
  const email = await currentAdmin(event)
  if (!email) throw createError({ statusCode: 401, message: 'Sign in required' })
  return email
}
