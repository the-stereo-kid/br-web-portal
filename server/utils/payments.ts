// Every call to the payment provider lives here, so swapping Yoco for Paystack is a one-file change.
import type { H3Event } from 'h3'
import { validYocoSignature } from './booking'

export async function createCheckout(opts: {
  amount: number // cents
  metadata: Record<string, string>
  successUrl: string
  cancelUrl: string
}): Promise<{ id: string; redirectUrl: string }> {
  return await $fetch('https://payments.yoco.com/api/checkouts', {
    method: 'POST',
    headers: { Authorization: `Bearer ${useRuntimeConfig().yocoSecretKey}` },
    body: {
      amount: opts.amount,
      currency: 'ZAR',
      successUrl: opts.successUrl,
      cancelUrl: opts.cancelUrl,
      failureUrl: opts.cancelUrl,
      metadata: opts.metadata
    }
  })
}

/** Returns the parsed webhook body, or throws 401 unless the signature is valid. */
export async function readVerifiedWebhook(event: H3Event): Promise<any> {
  const raw = (await readRawBody(event)) ?? ''
  const ok = validYocoSignature(
    useRuntimeConfig().yocoWebhookSecret,
    getHeader(event, 'webhook-id'),
    getHeader(event, 'webhook-timestamp'),
    raw,
    getHeader(event, 'webhook-signature')
  )
  if (!ok) throw createError({ statusCode: 401, message: 'Invalid webhook signature' })
  return JSON.parse(raw)
}
