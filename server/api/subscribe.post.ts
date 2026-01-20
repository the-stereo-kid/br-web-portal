export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { firstName, lastName, email } = body

  if (!firstName || !lastName || !email) {
    throw createError({
      statusCode: 400,
      message: 'First name, last name, and email are required'
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
    const response = await $fetch('https://api.mailerlite.com/api/v2/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MailerLite-ApiKey': apiKey
      },
      body: {
        email,
        name: `${firstName} ${lastName}`,
        groups: [groupId],
        fields: {
          name: firstName,
          last_name: lastName
        }
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
