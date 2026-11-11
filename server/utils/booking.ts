// Pure helpers (no Nuxt imports) so tests/booking.test.ts can load this file directly.
import { createHmac, timingSafeEqual } from 'node:crypto'

// South Africa is UTC+2 all year, so local time is a fixed shift.
export const toSast = (d: Date | string) => new Date(new Date(d).getTime() + 2 * 3600e3).toISOString().slice(0, 16)
export const fromSast = (local: string) => new Date(`${String(local).slice(0, 16)}:00+02:00`)

export interface Tier {
  id: number
  name: string
  price_cents: number
  quantity: number
  sales_end: Date | string | null
  sort: number
  taken: number // paid + rsvp + unexpired holds
}

export const spotsLeft = (t: Pick<Tier, 'quantity' | 'taken'>) => Math.max(0, t.quantity - t.taken)

/** The first tier, in order, that still has spots and has not closed. Early bird is just the first tier. */
export function tierOnSale<T extends Tier>(tiers: T[], now = new Date()): T | null {
  return (
    [...tiers]
      .sort((a, b) => a.sort - b.sort || a.id - b.id)
      .find((t) => spotsLeft(t) > 0 && (!t.sales_end || new Date(t.sales_end) > now)) ?? null
  )
}

const safeEqual = (a: string, b: string) => {
  const x = Buffer.from(a)
  const y = Buffer.from(b)
  return x.length === y.length && timingSafeEqual(x, y)
}

const hmac = (key: string | Buffer, text: string, encoding: 'base64' | 'base64url') =>
  createHmac('sha256', key).update(text).digest(encoding)

/**
 * Yoco webhook check, per developer.yoco.com "Verifying the events":
 * HMAC-SHA256 of "<webhook-id>.<webhook-timestamp>.<raw body>", keyed with the base64-decoded part of the secret
 * after "whsec_", compared against the "v1,<base64>" entries of webhook-signature. Timestamps older than 3 minutes fail.
 */
export function validYocoSignature(
  secret: string | undefined,
  id: string | undefined,
  timestamp: string | undefined,
  rawBody: string,
  signatureHeader: string | undefined,
  nowMs = Date.now()
): boolean {
  if (!secret || !id || !timestamp || !signatureHeader) return false
  if (!(Math.abs(nowMs / 1000 - Number(timestamp)) <= 180)) return false
  const key = Buffer.from(secret.replace(/^whsec_/, ''), 'base64')
  const expected = hmac(key, `${id}.${timestamp}.${rawBody}`, 'base64')
  return signatureHeader.split(' ').some((s) => safeEqual(s.replace(/^v1,/, ''), expected))
}

/** Stateless sign-in link token: "<payload>.<hmac>". */
export function signLogin(email: string, secret: string, expiresMs: number): string {
  const body = Buffer.from(JSON.stringify({ email, exp: expiresMs })).toString('base64url')
  return `${body}.${hmac(secret, body, 'base64url')}`
}

export function readLogin(token: string, secret: string, nowMs = Date.now()): string | null {
  const [body, sig] = String(token).split('.')
  if (!secret || !body || !sig || !safeEqual(sig, hmac(secret, body, 'base64url'))) return null
  const { email, exp } = JSON.parse(Buffer.from(body, 'base64url').toString())
  return typeof email === 'string' && exp > nowMs ? email : null
}

export interface CalendarEvent {
  slug: string
  title: string
  starts_at: Date | string
  ends_at: Date | string
  location: string
}

const icsDate = (d: Date | string) => new Date(d).toISOString().replace(/[-:]|\.\d{3}/g, '')
const icsText = (s: string) => String(s ?? '').replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/([,;])/g, '\\$1')

// ponytail: lines are not folded at 75 bytes; Google, Apple and Outlook accept long lines. Fold if a strict client complains.
export function buildIcs(events: CalendarEvent[], siteUrl: string): string {
  const host = new URL(siteUrl).host
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Brothers Rising//Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Brothers Rising',
    ...events.flatMap((e) => [
      'BEGIN:VEVENT',
      `UID:${e.slug}@${host}`,
      `DTSTAMP:${icsDate(new Date())}`,
      `DTSTART:${icsDate(e.starts_at)}`,
      `DTEND:${icsDate(e.ends_at)}`,
      `SUMMARY:${icsText(e.title)}`,
      `LOCATION:${icsText(e.location)}`,
      `URL:${siteUrl}/events/${e.slug}`,
      `DESCRIPTION:${icsText(`${siteUrl}/events/${e.slug}`)}`,
      'END:VEVENT'
    ]),
    'END:VCALENDAR',
    ''
  ].join('\r\n')
}

export function googleCalendarLink(e: CalendarEvent, siteUrl: string): string {
  const q = new URLSearchParams({
    action: 'TEMPLATE',
    text: e.title,
    dates: `${icsDate(e.starts_at)}/${icsDate(e.ends_at)}`,
    location: e.location,
    details: `${siteUrl}/events/${e.slug}`
  })
  return `https://calendar.google.com/calendar/render?${q}`
}
