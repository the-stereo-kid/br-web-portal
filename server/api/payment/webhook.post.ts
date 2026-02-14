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
    const mainGroupId = config.mailerLiteGroupId
    const retreatGroupId = config.mailerLiteRetreatGroupId
    const groupId = retreatGroupId || mainGroupId

    if (!apiKey || !groupId) {
      console.error('Webhook: MailerLite configuration missing')
      throw createError({
        statusCode: 500,
        message: 'MailerLite configuration is missing'
      })
    }

    const fields: Record<string, string> = {
      name: firstName,
      last_name: lastName,
      phone,
      payment_type: paymentType,
      source: 'retreat_booking'
    }
    if (dietaryRequirements) {
      fields.dietary_requirements = dietaryRequirements
    }

    await $fetch('https://api.mailerlite.com/api/v2/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MailerLite-ApiKey': apiKey
      },
      body: {
        email,
        name: `${firstName} ${lastName}`.trim() || email,
        groups: [groupId],
        fields
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
    console.error('Webhook processing error:', err)
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message || 'Failed to process webhook'
    })
  }
})
