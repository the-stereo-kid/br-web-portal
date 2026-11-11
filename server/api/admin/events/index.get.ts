// Admin event list, newest first, with how many places are booked.
export default defineEventHandler(async () => {
  const rows = await useDb()`
    select e.id, e.slug, e.title, e.status, e.source, e.starts_at, e.cta_mode,
      coalesce((select sum(o.quantity) from orders o where o.event_id = e.id and o.status in ('paid', 'rsvp')), 0)::int as booked
    from events e order by e.starts_at desc`
  return rows.map((e) => ({ ...e, starts_local: toSast(e.starts_at) }))
})
