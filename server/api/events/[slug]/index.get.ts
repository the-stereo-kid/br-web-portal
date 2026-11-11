// One event for its public page. Drafts are visible to signed-in admins only (preview).
export default defineEventHandler(async (event) => {
  const ev = await loadEvent({ slug: getRouterParam(event, 'slug')! })
  if (!ev || (ev.status !== 'published' && !(await currentAdmin(event)))) {
    throw createError({ statusCode: 404, message: 'Event not found' })
  }

  const siteUrl = useRuntimeConfig().public.siteUrl as string
  const tier = tierOnSale(ev.tiers)
  const bookable = ev.cta_mode !== 'external'
  const { tiers, ...rest } = ev
  return {
    ...rest,
    past: new Date(ev.ends_at) < new Date(),
    soldOut: bookable && (ev.sold_out || !tier),
    offer: bookable && tier ? { name: tier.name, price_cents: tier.price_cents, left: spotsLeft(tier) } : null,
    googleLink: googleCalendarLink(ev as any, siteUrl)
  }
})
