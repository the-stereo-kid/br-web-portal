import type { BookingFormData, PaymentType } from '~/types/payment'

const AMOUNTS: Record<PaymentType, number> = {
  full: 600000, // R6,000 in cents
  deposit: 200000 // R2,000 in cents
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { firstName, lastName, email, phone, dietaryRequirements, paymentType } = body as BookingFormData

  if (!firstName || !lastName || !email || !phone) {
    throw createError({
      statusCode: 400,
      message: 'First name, last name, email, and phone are required'
    })
  }

  const validPaymentTypes: PaymentType[] = ['full', 'deposit']
  if (!paymentType || !validPaymentTypes.includes(paymentType)) {
    throw createError({
      statusCode: 400,
      message: 'Valid payment type (full or deposit) is required'
    })
  }

  const config = useRuntimeConfig()
  const secretKey = config.yocoSecretKey
  const siteUrl = config.public.siteUrl as string

  if (!secretKey) {
    throw createError({
      statusCode: 500,
      message: 'Yoco configuration is missing'
    })
  }

  const amount = AMOUNTS[paymentType]

  const metadata: Record<string, string> = {
    firstName,
    lastName,
    email,
    phone,
    paymentType
  }
  if (dietaryRequirements) {
    metadata.dietaryRequirements = dietaryRequirements
  }

  try {
    const response = await $fetch<{ redirectUrl: string }>('https://payments.yoco.com/api/checkouts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json'
      },
      body: {
        amount,
        currency: 'ZAR',
        successUrl: `${siteUrl}/retreat/payment-success`,
        cancelUrl: `${siteUrl}/retreat/payment-cancelled`,
        failureUrl: `${siteUrl}/retreat/payment-cancelled`,
        metadata
      }
    })

    return { redirectUrl: response.redirectUrl }
  } catch (err: any) {
    const yocoMessage = err.data?.message ?? err.data?.error ?? (typeof err.data === 'string' ? err.data : null)
    const detail = yocoMessage || err.message || 'Failed to create checkout'
    console.error('Yoco API error:', err.statusCode, err.data ?? err.message)
    throw createError({
      statusCode: err.statusCode || 500,
      message: detail
    })
  }
})
