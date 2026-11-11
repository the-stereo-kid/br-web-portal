-- Test case: The Spirit of Pamoja rebuilt on the event template, at /events/spirit-of-pamoja.
-- Content copied from docs/pamoja-content-structure.md. Run after schema.sql. The original /pamoja page is untouched.
insert into events (slug, title, status, source, starts_at, ends_at, location, hero_image_url, cta_mode, external_url, blocks)
values (
  'spirit-of-pamoja',
  'The Spirit of Pamoja',
  'published',
  'own',
  '2026-03-22 10:00+02',
  '2026-03-22 18:00+02',
  'Cape Town area (exact location TBC)',
  '/images/ignite-the-warrior-2025-play.jpg',
  'external',
  'https://thegatheringofmen.checkoutpage.com/cpt-spirit-of-pamoj',
  $json$[
    {"type": "hero", "enabled": true, "data": {"subtitle": "Cape Town", "tagline": "Not a workshop, but a guided men's space"}},
    {"type": "intro", "enabled": true, "data": {
      "lead": "We are joining forces with The Gathering of Men for a massive day: The Spirit of Pamoja.",
      "body": "Pamoja — a Swahili word meaning \"together\" or \"unity\" — is what emerges when men gather in true brotherhood - a state we arrive at when we show up fully for ourselves and each other."}},
    {"type": "description", "enabled": true, "data": {
      "heading": "We're skipping the theory. We jump straight into action.",
      "text": "This is not a workshop where you sit and listen. This is an immersive experience where you move, feel, confront, and discover. Where you test your edges and find your center.\n\nWe'll be moving through 4 pillars: Peace (calmness within), Power (physical and mental strength), Purpose (clarity and direction) and Play (approaching life lightly).\n\nWe'll test ourselves like warriors, find stillness like monks, discover purpose like kings, and laugh freely like drunken masters.\n\nExpect raw moments, confronting resistance, honest conversations, sweat, moments to rest and reflect and laughter."}},
    {"type": "details", "enabled": true, "data": {
      "duration": "Full day Immersion",
      "investment": "R150 deposit",
      "note": "Donation-based for a brother in need",
      "footnote": "Limited to ensure depth and intimacy."}},
    {"type": "provided_bring", "enabled": true, "data": {
      "provided": "Guided experiences through all four pillars\nA seat in the circle\nReflection and integration opportunity",
      "bring": "Journal\nRefillable bottle\nTea mug\nComfy clothes\nSports wear\nTowel\nPotluck food to share!"}},
    {"type": "commit", "enabled": true, "data": {"heading": ""}}
  ]$json$::jsonb
)
on conflict (slug) do nothing;
