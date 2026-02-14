export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    // Store booking data from Yoco webhook payload
    // For now, log to console - can be extended to file/database later
    console.log('Yoco webhook received:', JSON.stringify(body, null, 2))
  } catch (err: any) {
    console.error('Webhook processing error:', err)
    throw createError({
      statusCode: 500,
      message: 'Failed to process webhook'
    })
  }

  return { received: true }
})
