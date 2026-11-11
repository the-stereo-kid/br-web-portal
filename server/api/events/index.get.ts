// Published events for the calendar. Times carry the +02:00 offset so the calendar shows South African time.
export default defineEventHandler(async () => {
  const rows = await useDb()`
    select slug, title, starts_at, ends_at, location, source
    from events where status = 'published' order by starts_at`
  return rows.map((e) => ({
    slug: e.slug,
    title: e.title,
    location: e.location,
    source: e.source,
    start: `${toSast(e.starts_at)}:00+02:00`,
    end: `${toSast(e.ends_at)}:00+02:00`
  }))
})
