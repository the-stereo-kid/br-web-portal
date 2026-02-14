export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const checkoutId = query.id as string

  if (!checkoutId) {
    throw createError({
      statusCode: 400,
      message: 'Checkout ID is required'
    })
  }

  const config = useRuntimeConfig()
  const secretKey = config.yocoSecretKey

  if (!secretKey) {
    throw createError({
      statusCode: 500,
      message: 'Yoco configuration is missing'
    })
  }

  try {
    const response = await $fetch(`https://payments.yoco.com/api/checkouts/${checkoutId}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`
      }
    })

    return response
  } catch (err: any) {
    console.error('Yoco verify error:', err)
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.data?.message || err.message || 'Failed to verify checkout'
    })
  }
})
