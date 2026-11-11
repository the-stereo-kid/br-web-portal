# Events calendar, event pages and ticket confirmations

Technical document. Agreed 2026-11-11. Status: requirements settled, nothing built yet.

Mockups: https://claude.ai/artifact/WvMhNLkdkEofTgjQ4d16kK (private link; board B, parchment, is the chosen skin).

## 1. Requirements

### 1.1 Goals

- Visitors can see what is coming up and add it to their own calendar.
- The admin team can publish and edit events without touching code.
- Anyone who books through the site gets a confirmation.
- Upkeep stays minimal: one technical maintainer, few moving parts.

### 1.2 Functional requirements

**Calendar**

| ID | Requirement |
|---|---|
| CAL-1 | A public page at `/events` shows published events on a calendar. |
| CAL-2 | The visitor can switch between month, week and list views. |
| CAL-3 | On phones the list view is the default. |
| CAL-4 | Selecting an event opens its event page. |
| CAL-5 | Brothers Rising events and community events are visibly different and labelled. |
| CAL-6 | Past events stay visible, with booking closed. |
| CAL-7 | The calendar is linked from the site navigation. |

**Calendar sync**

| ID | Requirement |
|---|---|
| SYNC-1 | The site publishes a subscribe feed (`/calendar.ics`) of all published events. |
| SYNC-2 | A "Subscribe to calendar" button adds the feed to Google, Apple or Outlook calendars. |
| SYNC-3 | Each event page has an "Add to Google Calendar" button and a downloadable `.ics` for that event. |
| SYNC-4 | The site is the source of truth. Sync is one-way; no Google API or Google account is used. |

**Event pages**

| ID | Requirement |
|---|---|
| EVT-1 | Every event page is rendered from one template made of blocks. |
| EVT-2 | v1 blocks, in fixed order: hero image, intro, description, event details, what's provided / what you bring, ready to commit. |
| EVT-3 | Hero, event details and ready to commit are always shown; the others can be switched off per event. |
| EVT-4 | Blocks are stored as an ordered list so that reordering, new block types (for example four pillars) and custom HTML can be added later without changing the data model. |
| EVT-5 | The ready-to-commit block has one of three modes per event: tickets, free RSVP, or external booking link. |
| EVT-6 | The existing `/pamoja` and `/retreat` pages are unchanged. A templated copy of Spirit of Pamoja is built as the test case. |

**Admin**

| ID | Requirement |
|---|---|
| ADM-1 | Admins sign in with an emailed link. Only addresses on an approved list can sign in. There are no passwords. |
| ADM-2 | Admins can create, edit, duplicate, publish and unpublish events. |
| ADM-3 | Admins can upload a hero image from the event form. |
| ADM-4 | Admins can mark an event as a community event; these take an external booking link only. |
| ADM-5 | Admins can define ticket tiers for an event. |
| ADM-6 | Admins can see who has booked each event: name, email, phone, tier, quantity, paid or not. |
| ADM-7 | Admins can mark an event sold out by hand, overriding the automatic count. |

**Tickets and RSVPs**

| ID | Requirement |
|---|---|
| TIX-1 | An event can have one or more tiers, each with a name, price, quantity and optional closing date. |
| TIX-2 | The tier on sale is the first one with spots left that has not closed. Early bird and "first N to book" pricing are tiers. |
| TIX-3 | A buyer gives name, email and phone, and can buy up to 4 tickets per checkout. No account is needed. |
| TIX-4 | Spots are held for 15 minutes while the buyer pays, then released if unpaid. |
| TIX-5 | An event shows as sold out automatically when no tier has spots left. It must not be possible to oversell. |
| TIX-6 | Payment is taken by Yoco's hosted checkout. The site never handles card details. |
| TIX-7 | A booking counts as paid only when a verified payment notification arrives from Yoco, not when the buyer returns to the site. |
| TIX-8 | Free RSVP events collect the same details and respect the same quantity limits, with no payment. |
| TIX-9 | The existing retreat booking flow keeps working. |

**Confirmations**

| ID | Requirement |
|---|---|
| MAIL-1 | A paid booking or RSVP triggers a confirmation email to the buyer, sent from `hello@brothersrising.com`. |
| MAIL-2 | The email contains the event name, date, time, location, tier, quantity and amount paid, plus a calendar attachment. |
| MAIL-3 | Each booking gets exactly one confirmation, even if Yoco sends the notification more than once. |
| MAIL-4 | Buyers are still added to the MailerLite list, as they are today. |

### 1.3 Non-functional requirements

| ID | Requirement |
|---|---|
| NFR-1 | Runs on the existing Vercel project and domain (`brothersrising.com`). No extra servers. |
| NFR-2 | Matches the site's light stone and amber theme and Georgia headings. |
| NFR-3 | Works at phone width; controls are at least 44px tall; text meets 4.5:1 contrast. |
| NFR-4 | Payment notifications are rejected unless their signature is valid. |
| NFR-5 | Admin pages and admin API routes are unreachable without a signed-in session. |
| NFR-6 | Payment provider calls sit in one file so Paystack can replace Yoco later. |
| NFR-7 | Times are stored with a timezone and shown in South African time. |
| NFR-8 | New dependencies are kept to the calendar library, the database driver and the image store client. |

### 1.4 Out of scope for v1

- Public event submissions and the approve / reject flow. Admins enter community events themselves for now.
- Scout integration and payouts for community events.
- Reminder emails before an event.
- Refunds through the site (done in the Yoco dashboard).
- Promo codes.
- Per-attendee details, attendee export and check-in.
- Recurring events. Fortnightly circles are created by hand with the duplicate button.
- Drag-to-reorder blocks, extra block types and custom HTML.
- Paystack.

## 2. Technology choices

| Area | Choice | Why |
|---|---|---|
| Database | Neon Postgres via the Vercel Marketplace | One click from Vercel, connection details injected automatically, free tier |
| Images | Vercel Blob | Same platform, served from Vercel's CDN |
| Email | Resend | Simple transactional API; DNS records sit on a subdomain and do not disturb the iCloud mailbox |
| Payments | Yoco (existing) | Already integrated; Paystack later |
| Calendar | FullCalendar with its Vue 3 component | Month, week and list views built in; styled with plain CSS |
| Admin sessions | Nuxt's built-in sealed-cookie sessions | No extra dependency |
| Calendar feed | Hand-written `.ics` output | About 30 lines; no library needed |

Considered and not chosen: Supabase (pauses idle free projects, separate platform), Railway Postgres (the site is not on Railway), Directus / Sanity / Payload (a second system to run; the checkout still has to be built by us), files in the repo (cannot count tickets).

## 3. Data model

```
events        id, slug, title, status (draft | published),
              source (own | community), starts_at, ends_at, location,
              hero_image_url, blocks (jsonb), cta_mode (tickets | rsvp | external),
              external_url, sold_out (manual override), created_at
ticket_tiers  id, event_id, name, price_cents, quantity, sales_end, sort
orders        id, event_id, tier_id, quantity, name, email, phone, amount_cents,
              status (held | paid | rsvp | expired), hold_expires_at,
              checkout_id, confirmation_sent_at, created_at
admins        email
login_tokens  token_hash, email, expires_at
```

- `blocks` is an ordered array of `{ type, data }`. The page renders them in order through a type-to-component map (EVT-4).
- Spots left on a tier = `quantity` minus paid orders minus unexpired holds. Expired holds are ignored by the query, so no scheduled job is needed (TIX-4).
- Reserving spots runs in one transaction that locks the tier row (TIX-5).
- `confirmation_sent_at` is set in the same step that claims the send, which makes MAIL-3 hold under repeated notifications.
- Adding public submissions later means adding `pending` and `rejected` statuses and submitter columns; nothing else changes.

## 4. Routes

| Route | Purpose |
|---|---|
| `/events` | Calendar and subscribe button |
| `/events/<slug>` | Event page from the template |
| `/events/<slug>/booked` | "You're in" page after payment or RSVP |
| `/admin/login` | Request a sign-in link |
| `/admin` | Event list |
| `/admin/events/<id>` | Event form, ticket tiers, attendee list, duplicate |
| `/calendar.ics` | Subscribe feed |
| `/api/payment/webhook` | Existing Yoco webhook, extended for ticket orders and signature checks |

## 5. Phases

Each phase is shippable on its own.

1. **Foundations.** Database and schema, image store, email domain, admin login.
2. **Events and template.** Block components adapted from the Pamoja ones, the event page, the admin event form, the templated Spirit of Pamoja test page.
3. **Calendar.** `/events` in the parchment skin, the subscribe feed, "Add to Google Calendar", the nav link.
4. **Tickets and confirmations.** Tiers, checkout with holds, webhook signature check, confirmation email, free RSVP, attendee list.

## 6. Checks

One small test file for the money path: tier selection, spots-left arithmetic and webhook signature validation.

## 7. Known limits and open items

- Google re-reads subscribed calendars slowly, often 12 to 24 hours.
- Events with an external booking link get no confirmation email from us, because we never see the payment.
- The current Yoco webhook accepts unsigned requests. Phase 4 fixes this; the exact signature format must be confirmed against Yoco's documentation.
- Neon and Resend free-tier limits must be confirmed at setup.

## 8. Setup the site owner must do

- Add Neon and Blob to the Vercel project.
- Create the Resend account and add its DNS records for `brothersrising.com`.
- Make sure `hello@brothersrising.com` exists as a mailbox so replies land somewhere.
- Copy the Yoco webhook secret into Vercel.
- Supply the list of admin email addresses.
