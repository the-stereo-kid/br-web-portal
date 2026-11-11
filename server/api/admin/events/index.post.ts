// Create or update an event and its ticket tiers. Body carries `id` when updating.
const slugify = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
const bad = (message: string) => createError({ statusCode: 400, message })

export default defineEventHandler(async (event) => {
  const b = await readBody(event)
  const title = String(b?.title || '').trim()
  const slug = slugify(String(b?.slug || title))
  const starts = fromSast(b?.starts_local)
  const ends = fromSast(b?.ends_local)
  const source = b?.source === 'community' ? 'community' : 'own'
  const cta = source === 'community' ? 'external' : ['tickets', 'rsvp', 'external'].includes(b?.cta_mode) ? b.cta_mode : 'external'
  const externalUrl = String(b?.external_url || '').trim()
  const tiers: any[] = cta === 'external' ? [] : Array.isArray(b?.tiers) ? b.tiers : []

  if (!title || !slug) throw bad('A title is required')
  if (isNaN(+starts) || isNaN(+ends) || ends < starts) throw bad('Start and end are required, and the end must be after the start')
  if (cta === 'external' && externalUrl && !/^https?:\/\//.test(externalUrl)) throw bad('The booking link must start with https://')
  if (b?.status === 'published' && cta === 'external' && !externalUrl) throw bad('Add the booking link before publishing')
  if (b?.status === 'published' && cta !== 'external' && !tiers.length) throw bad('Add at least one ticket tier before publishing')
  for (const t of tiers) {
    const price = cta === 'rsvp' ? 0 : Number(t.price_cents)
    if (!String(t.name || '').trim() || !Number.isInteger(price) || price < 0 || !Number.isInteger(Number(t.quantity)) || Number(t.quantity) < 0) {
      throw bad('Every ticket tier needs a name, a price and a quantity')
    }
  }

  const row = {
    slug,
    title,
    status: b?.status === 'published' ? 'published' : 'draft',
    source,
    starts_at: starts,
    ends_at: ends,
    location: String(b?.location || '').trim(),
    hero_image_url: String(b?.hero_image_url || '').trim(),
    cta_mode: cta,
    external_url: externalUrl,
    sold_out: !!b?.sold_out
  }
  const blocks = Array.isArray(b?.blocks) ? b.blocks : []
  const sql = useDb()

  try {
    const id = await sql.begin(async (tx) => {
      const [saved] = b?.id
        ? await tx`update events set ${tx(row)}, blocks = ${tx.json(blocks)} where id = ${Number(b.id)} returning id`
        : await tx`insert into events ${tx({ ...row, blocks: tx.json(blocks) } as any)} returning id`
      if (!saved) throw createError({ statusCode: 404, message: 'Event not found' })

      const keep: number[] = []
      for (const [i, t] of tiers.entries()) {
        const tier = {
          name: String(t.name).trim(),
          price_cents: cta === 'rsvp' ? 0 : Number(t.price_cents),
          quantity: Number(t.quantity),
          sales_end: t.sales_end_local ? fromSast(t.sales_end_local) : null,
          sort: i
        }
        const [updated] = t.id
          ? await tx`update ticket_tiers set ${tx(tier)} where id = ${Number(t.id)} and event_id = ${saved.id} returning id`
          : []
        const [r] = updated ? [updated] : await tx`insert into ticket_tiers ${tx({ ...tier, event_id: saved.id })} returning id`
        keep.push(r.id)
      }
      // Removed tiers are deleted, unless someone has already booked on them: those are closed instead.
      await tx`
        delete from ticket_tiers t
        where t.event_id = ${saved.id} and t.id <> all(${keep}::int[])
          and not exists (select 1 from orders o where o.tier_id = t.id)`
      await tx`
        update ticket_tiers set sales_end = now()
        where event_id = ${saved.id} and id <> all(${keep}::int[]) and (sales_end is null or sales_end > now())`
      return saved.id as number
    })
    return { id, slug }
  } catch (err: any) {
    if (err?.code === '23505') throw createError({ statusCode: 409, message: `The address "${slug}" is already used by another event` })
    throw err
  }
})
