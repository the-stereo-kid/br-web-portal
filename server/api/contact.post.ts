export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, message } = body

  if (!name || !email || !message) {
    throw createError({
      statusCode: 400,
      message: 'Name, email, and message are required'
    })
  }

  const apiKey = useRuntimeConfig().mailerLiteApiKey
  const groupId = useRuntimeConfig().mailerLiteGroupId

  if (!apiKey || !groupId) {
    throw createError({
      statusCode: 500,
      message: 'MailerLite configuration is missing'
    })
  }

  try {
    // Add contact as subscriber with a tag or custom field to identify as contact form submission
    const response = await $fetch('https://api.mailerlite.com/api/v2/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MailerLite-ApiKey': apiKey
      },
      body: {
        email,
        name,
        groups: [groupId],
        fields: {
          message: message,
          source: 'contact_form'
        }
      }
    })

    return { success: true, data: response }
  } catch (err: any) {
    console.error('MailerLite API error:', err)
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message || 'Failed to send contact message'
    })
  }
})
