// Run: npm test
import assert from 'node:assert/strict'
import { createHmac } from 'node:crypto'
import { test } from 'node:test'
import { buildIcs, fromSast, readLogin, signLogin, spotsLeft, tierOnSale, toSast, validYocoSignature } from '../server/utils/booking.ts'

const tier = (o: object) => ({ id: 1, name: 't', price_cents: 100, quantity: 10, sales_end: null, sort: 0, taken: 0, ...o })

test('early bird sells first, then the next tier', () => {
  const early = tier({ id: 1, name: 'Early bird', quantity: 5, sort: 0 })
  const full = tier({ id: 2, name: 'Standard', sort: 1 })
  assert.equal(tierOnSale([full, early])?.name, 'Early bird')
  assert.equal(tierOnSale([full, { ...early, taken: 5 }])?.name, 'Standard')
  assert.equal(tierOnSale([full, { ...early, sales_end: '2020-01-01T00:00:00Z' }])?.name, 'Standard')
})

test('sold out when every tier is full or closed', () => {
  assert.equal(tierOnSale([tier({ taken: 10 }), tier({ id: 2, sales_end: '2020-01-01T00:00:00Z' })]), null)
  assert.equal(tierOnSale([]), null)
  assert.equal(spotsLeft({ quantity: 3, taken: 5 }), 0)
})

test('yoco signature', () => {
  const key = Buffer.from('super-secret-key')
  const secret = `whsec_${key.toString('base64')}`
  const body = '{"type":"payment.succeeded"}'
  const now = 1_800_000_000_000
  const ts = String(now / 1000)
  const sig = createHmac('sha256', key).update(`msg_1.${ts}.${body}`).digest('base64')

  assert.ok(validYocoSignature(secret, 'msg_1', ts, body, `v1,${sig}`, now))
  assert.ok(validYocoSignature(secret, 'msg_1', ts, body, `v1,bogus v1,${sig}`, now))
  assert.ok(!validYocoSignature(secret, 'msg_1', ts, body + ' ', `v1,${sig}`, now), 'tampered body')
  assert.ok(!validYocoSignature(secret, 'msg_1', ts, body, `v1,${sig}`, now + 181_000), 'stale timestamp')
  assert.ok(!validYocoSignature(secret, 'msg_1', 'nonsense', body, `v1,${sig}`, now), 'bad timestamp')
  assert.ok(!validYocoSignature(undefined, 'msg_1', ts, body, `v1,${sig}`, now), 'missing secret')
  assert.ok(!validYocoSignature(secret, 'msg_1', ts, body, undefined, now), 'missing header')
})

test('sign-in link token', () => {
  const token = signLogin('a@b.co', 'pw', 2000)
  assert.equal(readLogin(token, 'pw', 1000), 'a@b.co')
  assert.equal(readLogin(token, 'pw', 3000), null, 'expired')
  assert.equal(readLogin(token, 'other', 1000), null, 'wrong secret')
  assert.equal(readLogin(token.replace(/^./, 'X'), 'pw', 1000), null, 'tampered')
  assert.equal(readLogin('garbage', 'pw', 1000), null)
})

test('SAST conversion and calendar feed', () => {
  assert.equal(toSast('2026-12-12T08:00:00Z'), '2026-12-12T10:00')
  assert.equal(fromSast('2026-12-12T10:00').toISOString(), '2026-12-12T08:00:00.000Z')
  const ics = buildIcs([{ slug: 'x', title: 'Fire, circle; talk', starts_at: '2026-12-12T08:00:00Z', ends_at: '2026-12-12T16:00:00Z', location: 'Cape Town' }], 'https://brothersrising.com')
  assert.match(ics, /DTSTART:20261212T080000Z\r\n/)
  assert.ok(ics.includes('SUMMARY:Fire\\, circle\\; talk\r\n'))
  assert.match(ics, /UID:x@brothersrising\.com/)
})
