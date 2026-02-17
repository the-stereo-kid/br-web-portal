export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const eventType = body?.type
    const payload = body?.payload
    const metadata = payload?.metadata

    if (eventType !== 'payment.succeeded') {
      return { received: true }
    }

    const email = metadata?.email
    if (!email) {
      console.error('Webhook: payment.succeeded missing email in metadata', { body })
      return { received: true }
    }

    const firstName = metadata?.firstName ?? ''
    const lastName = metadata?.lastName ?? ''
    const phone = metadata?.phone ?? ''
    const paymentType = metadata?.paymentType ?? ''
    const dietaryRequirements = metadata?.dietaryRequirements ?? ''

    const config = useRuntimeConfig()
    const apiKey = config.mailerLiteApiKey
    const newsletterGroupId = config.mailerLiteNewsletterGroup
    const retreatGroupId = config.mailerLiteRetreatGroup
    const groupId = retreatGroupId || newsletterGroupId

    if (!apiKey || !groupId) {
      console.error('Webhook: MailerLite configuration missing')
      throw createError({
        statusCode: 500,
        message: 'MailerLite configuration is missing'
      })
    }

    // Fields must match MailerLite Subscribers → Fields. Omit 'source' (reserved).
    const fields: Record<string, string> = {
      name: firstName,
      last_name: lastName,
      phone: phone || '',
      payment_type: paymentType,
      dietary_requirements: dietaryRequirements
    }

    await $fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: {
        email,
        fields,
        groups: [groupId]
      }
    })

    return { received: true }
  } catch (err: any) {
    const errMsg = (err?.data?.message ?? err?.message ?? '').toString().toLowerCase()
    const isDuplicate = (err?.statusCode === 400 || err?.statusCode === 409) && errMsg.includes('already exists')
    if (isDuplicate) {
      console.error('Webhook: subscriber already exists, skipping MailerLite add')
      return { received: true }
    }
    // Log full MailerLite response for debugging 422/validation errors
    console.error('Webhook MailerLite error:', {
      statusCode: err?.statusCode,
      message: err?.message,
      mailerLiteResponse: err?.data
    })
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message || 'Failed to process webhook'
    })
  }
})
