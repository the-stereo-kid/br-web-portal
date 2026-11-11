// Books a paid ticket (holds the spots, then sends the buyer to Yoco) or a free RSVP (confirmed immediately).
const HOLD_MINUTES = 15

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!
  const body = await readBody(event)
  const name = String(body?.name || '').trim()
  const email = String(body?.email || '').trim().toLowerCase()
  const phone = String(body?.phone || '').trim()
  const quantity = Number(body?.quantity)

  if (!name || !phone || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    throw createError({ statusCode: 400, message: 'Name, a valid email and a phone number are required' })
  }
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 4) {
    throw createError({ statusCode: 400, message: 'You can book between 1 and 4 places at a time' })
  }

  const ev = await loadEvent({ slug })
  if (!ev || ev.status !== 'published') throw createError({ statusCode: 404, message: 'Event not found' })
  if (ev.cta_mode === 'external') throw createError({ statusCode: 400, message: 'This event is booked elsewhere' })
  if (new Date(ev.ends_at) < new Date()) throw createError({ statusCode: 400, message: 'This event has passed' })

  const tier = ev.sold_out ? null : tierOnSale(ev.tiers)
  if (!tier) throw createError({ statusCode: 409, message: 'This event is sold out' })
  if (spotsLeft(tier) < quantity) {
    throw createError({ statusCode: 409, message: `Only ${spotsLeft(tier)} left at this price. Book those, then come back for the rest.` })
  }

  const amount = tier.price_cents * quantity
  const free = ev.cta_mode === 'rsvp' || amount === 0
  const sql = useDb()

  // Lock the tier row so two buyers can't both take the last spot, then insert only if the spots are still there.
  const order = await sql.begin(async (tx) => {
    await tx`select id from ticket_tiers where id = ${tier.id} for update`
    const [row] = await tx`
      insert into orders (event_id, tier_id, quantity, name, email, phone, amount_cents, status, hold_expires_at)
      select ${ev.id}, ${tier.id}, ${quantity}, ${name}, ${email}, ${phone}, ${free ? 0 : amount},
             ${free ? 'rsvp' : 'held'}, ${free ? null : new Date(Date.now() + HOLD_MINUTES * 60e3)}
      where (select quantity from ticket_tiers where id = ${tier.id}) - coalesce((
        select sum(o.quantity) from orders o
        where o.tier_id = ${tier.id}
          and (o.status in ('paid', 'rsvp') or (o.status = 'held' and o.hold_expires_at > now()))
      ), 0) >= ${quantity}
      returning id`
    return row
  })
  if (!order) throw createError({ statusCode: 409, message: 'Those places were just taken. Please try again.' })

  if (free) {
    // The place is booked either way; a failed email is logged, not shown as a failed booking (which would invite a duplicate).
    await sendConfirmation(order.id).catch((err) => console.error('Confirmation email failed for order', order.id, err?.data ?? err?.message))
    return { redirectUrl: `/events/${slug}/booked` }
  }

  const siteUrl = useRuntimeConfig().public.siteUrl as string
  try {
    const checkout = await createCheckout({
      amount,
      metadata: { orderId: String(order.id), slug },
      successUrl: `${siteUrl}/events/${slug}/booked`,
      cancelUrl: `${siteUrl}/events/${slug}?cancelled=1#commit`
    })
    await sql`update orders set checkout_id = ${checkout.id} where id = ${order.id}`
    return { redirectUrl: checkout.redirectUrl }
  } catch (err: any) {
    await sql`delete from orders where id = ${order.id}` // release the hold
    console.error('Checkout failed for order', order.id, err?.data ?? err?.message)
    throw createError({ statusCode: 502, message: 'We could not start the payment. Please try again.' })
  }
})
