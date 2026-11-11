-- Run once in the Neon SQL editor (safe to re-run).
create table if not exists events (
  id serial primary key,
  slug text not null unique,
  title text not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  source text not null default 'own' check (source in ('own', 'community')),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  location text not null default '',
  hero_image_url text not null default '',
  blocks jsonb not null default '[]',
  cta_mode text not null default 'external' check (cta_mode in ('tickets', 'rsvp', 'external')),
  external_url text not null default '',
  sold_out boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists ticket_tiers (
  id serial primary key,
  event_id int not null references events (id) on delete cascade,
  name text not null,
  price_cents int not null check (price_cents >= 0),
  quantity int not null check (quantity >= 0),
  sales_end timestamptz,
  sort int not null default 0
);

-- A 'held' order only counts while hold_expires_at is in the future, so nothing has to clean up abandoned checkouts.
create table if not exists orders (
  id serial primary key,
  event_id int not null references events (id),
  tier_id int not null references ticket_tiers (id),
  quantity int not null check (quantity between 1 and 4),
  name text not null,
  email text not null,
  phone text not null,
  amount_cents int not null,
  status text not null check (status in ('held', 'paid', 'rsvp')),
  hold_expires_at timestamptz,
  checkout_id text,
  confirmation_sent_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists orders_tier_idx on orders (tier_id);
