// Emails a sign-in link if the address is on the admin list. Always answers the same, so the list can't be probed.
export default defineEventHandler(async (event) => {
  const { email } = await readBody(event)
  const address = String(email || '').trim().toLowerCase()
  const config = useRuntimeConfig()

  if (config.sessionPassword && adminEmails().includes(address)) {
    // ponytail: the link can be reused until it expires (15 min). Store used tokens if single-use ever matters.
    const token = signLogin(address, config.sessionPassword, Date.now() + 15 * 60e3)
    const link = `${config.public.siteUrl}/api/auth/verify?token=${encodeURIComponent(token)}`
    await sendMail({
      to: address,
      subject: 'Your Brothers Rising sign-in link',
      html: `<p><a href="${link}">Sign in to the Brothers Rising admin</a></p><p>This link works for 15 minutes. If you didn't ask for it, ignore this email.</p>`
    })
  }
  return { ok: true }
})
