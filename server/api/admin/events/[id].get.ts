// One event for the admin form, with its tiers and attendee list.
export default defineEventHandler(async (event) => {
  const ev = await loadEvent({ id: Number(getRouterParam(event, 'id')) || 0 })
  if (!ev) throw createError({ statusCode: 404, message: 'Event not found' })

  const orders = await useDb()`
    select o.id, o.name, o.email, o.phone, o.quantity, o.amount_cents, o.status, o.created_at, t.name as tier
    from orders o join ticket_tiers t on t.id = o.tier_id
    where o.event_id = ${ev.id} and (o.status in ('paid', 'rsvp') or o.hold_expires_at > now())
    order by o.created_at`

  return {
    ...ev,
    tiers: ev.tiers.map((t) => ({ ...t, sales_end_local: t.sales_end ? toSast(t.sales_end) : '' })),
    orders
  }
})
