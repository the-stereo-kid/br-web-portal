// The subscribe feed: every published event. Calendar apps re-read this address on their own schedule.
export default defineEventHandler(async (event) => {
  const rows = await useDb()`
    select slug, title, starts_at, ends_at, location
    from events where status = 'published' order by starts_at`

  setHeader(event, 'Content-Type', 'text/calendar; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=900')
  return buildIcs([...rows] as any, useRuntimeConfig().public.siteUrl as string)
})
