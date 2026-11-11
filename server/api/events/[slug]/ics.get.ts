// Single-event calendar file for the "Download .ics" button.
export default defineEventHandler(async (event) => {
  const ev = await loadEvent({ slug: getRouterParam(event, 'slug')! })
  if (!ev || ev.status !== 'published') throw createError({ statusCode: 404, message: 'Event not found' })

  setHeader(event, 'Content-Type', 'text/calendar; charset=utf-8')
  setHeader(event, 'Content-Disposition', `attachment; filename="${ev.slug}.ics"`)
  return buildIcs([ev as any], useRuntimeConfig().public.siteUrl as string)
})
