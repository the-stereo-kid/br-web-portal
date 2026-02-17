export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email } = body

  if (!email) {
    throw createError({
      statusCode: 400,
      message: 'Email is required'
    })
  }

  const apiKey = useRuntimeConfig().mailerLiteApiKey
  const groupId = useRuntimeConfig().mailerLiteNewsletterGroup

  if (!apiKey || !groupId) {
    throw createError({
      statusCode: 500,
      message: 'MailerLite configuration is missing'
    })
  }

  try {
    const response = await $fetch('https://api.mailerlite.com/api/v2/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MailerLite-ApiKey': apiKey
      },
      body: {
        email,
        groups: [groupId]
      }
    })

    return { success: true, data: response }
  } catch (err: any) {
    console.error('MailerLite API error:', err)
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message || 'Failed to subscribe to newsletter'
    })
  }
})
