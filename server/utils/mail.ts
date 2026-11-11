export async function sendMail(mail: {
  to: string
  subject: string
  html: string
  attachments?: { filename: string; content: string }[] // content is base64
}): Promise<void> {
  const config = useRuntimeConfig()
  if (!config.resendApiKey) throw createError({ statusCode: 500, message: 'RESEND_API_KEY is not set' })
  await $fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${config.resendApiKey}` },
    body: { from: config.mailFrom, ...mail }
  })
}

export const escapeHtml = (s: unknown) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
