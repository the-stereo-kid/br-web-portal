import { buildIcs, toSast, type Tier } from './booking'
import { escapeHtml, sendMail } from './mail'

/** One event with its tiers; each tier carries `taken` (paid + rsvp + unexpired holds). */
export async function loadEvent(where: { slug: string } | { id: number }) {
  const sql = useDb()
  const [ev] = 'id' in where
    ? await sql`select * from events where id = ${where.id}`
    : await sql`select * from events where slug = ${where.slug}`
  if (!ev) return null

  const tiers = await sql<Tier[]>`
    select t.*, coalesce((
      select sum(o.quantity) from orders o
      where o.tier_id = t.id
        and (o.status in ('paid', 'rsvp') or (o.status = 'held' and o.hold_expires_at > now()))
    ), 0)::int as taken
    from ticket_tiers t
    where t.event_id = ${ev.id}
    order by t.sort, t.id`

  return { ...ev, starts_local: toSast(ev.starts_at), ends_local: toSast(ev.ends_at), tiers: [...tiers] }
}

const rand = (cents: number) => `R${(cents / 100).toFixed(2).replace(/\.00$/, '')}`

/**
 * Sends the booking confirmation exactly once per order: the UPDATE claims the send, and a failed send
 * releases the claim so a webhook retry can try again.
 */
export async function sendConfirmation(orderId: number): Promise<void> {
  const sql = useDb()
  const [order] = await sql`
    update orders set confirmation_sent_at = now()
    where id = ${orderId} and confirmation_sent_at is null
    returning *`
  if (!order) return

  try {
    const [ev] = await sql`select * from events where id = ${order.event_id}`
    const [tier] = await sql`select name from ticket_tiers where id = ${order.tier_id}`
    const config = useRuntimeConfig()
    const siteUrl = config.public.siteUrl as string
    const start = new Date(`${toSast(ev.starts_at)}:00Z`)
    const when = `${start.toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}, ${toSast(ev.starts_at).slice(11)} to ${toSast(ev.ends_at).slice(11)}`
    const row = (label: string, value: string) =>
      `<tr><td style="padding:6px 16px 6px 0;color:#78716c">${label}</td><td style="padding:6px 0;color:#292524"><strong>${escapeHtml(value)}</strong></td></tr>`

    await sendMail({
      to: order.email,
      subject: `You're in: ${ev.title}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;color:#292524">
          <h1 style="font-size:26px">You're in, ${escapeHtml(order.name.split(' ')[0])}.</h1>
          <p style="font-family:system-ui,sans-serif;font-size:16px;line-height:1.5">Your place at <strong>${escapeHtml(ev.title)}</strong> is confirmed.</p>
          <table style="font-family:system-ui,sans-serif;font-size:15px;border-collapse:collapse;margin:16px 0">
            ${row('When', when)}
            ${row('Where', ev.location || 'To be confirmed')}
            ${row('Ticket', `${order.quantity} × ${tier.name}`)}
            ${row(order.status === 'paid' ? 'Paid' : 'Cost', order.amount_cents ? rand(order.amount_cents) : 'Free')}
          </table>
          <p style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5">The attached file adds the event to your calendar. Details are always at <a href="${siteUrl}/events/${ev.slug}" style="color:#b45309">${siteUrl}/events/${ev.slug}</a>.</p>
          <p style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5">Questions? Just reply to this email.</p>
          <p style="font-size:16px">Brothers Rising</p>
        </div>`,
      attachments: [{ filename: `${ev.slug}.ics`, content: Buffer.from(buildIcs([ev as any], siteUrl)).toString('base64') }]
    })

    // Optional and non-critical: a MailerLite failure must not block or repeat the confirmation.
    if (config.mailerLiteApiKey && config.mailerLiteEventsGroup) {
      await $fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: { Authorization: `Bearer ${config.mailerLiteApiKey}` },
        body: { email: order.email, fields: { name: order.name, phone: order.phone }, groups: [config.mailerLiteEventsGroup] }
      }).catch((err) => console.error('MailerLite add failed for order', orderId, err?.data ?? err?.message))
    }
  } catch (err) {
    await sql`update orders set confirmation_sent_at = null where id = ${orderId}`
    throw err
  }
}
