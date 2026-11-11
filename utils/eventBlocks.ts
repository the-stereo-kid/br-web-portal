// The event template is an ordered list of blocks. The page renders them in array order, so reordering,
// new block types and custom HTML can be added later without touching stored events.
export interface EventBlock {
  type: string
  enabled: boolean
  data: Record<string, string>
}

export const BLOCK_LABELS: Record<string, string> = {
  hero: 'Hero image',
  intro: 'Intro',
  description: 'Description',
  details: 'Event details',
  provided_bring: "What's provided / what you bring",
  commit: 'Ready to commit'
}

// These three always show.
export const REQUIRED_BLOCKS = ['hero', 'details', 'commit']

export const defaultBlocks = (): EventBlock[] => [
  { type: 'hero', enabled: true, data: { subtitle: '', tagline: '' } },
  { type: 'intro', enabled: true, data: { lead: '', body: '' } },
  { type: 'description', enabled: true, data: { heading: '', text: '' } },
  { type: 'details', enabled: true, data: { duration: '', investment: '', note: '', footnote: '' } },
  { type: 'provided_bring', enabled: true, data: { provided: '', bring: '' } },
  { type: 'commit', enabled: true, data: { heading: '' } }
]

/** Saved blocks laid over the defaults, so an event saved before a field existed still gets it. */
export function mergeBlocks(saved: EventBlock[] | null | undefined): EventBlock[] {
  return defaultBlocks().map((d) => {
    const s = saved?.find((b) => b.type === d.type)
    return s ? { ...d, enabled: REQUIRED_BLOCKS.includes(d.type) || s.enabled !== false, data: { ...d.data, ...s.data } } : d
  })
}

/** "2026-12-12T10:00" (South African local time) -> display strings, independent of the visitor's timezone. */
const asUtc = (local: string) => new Date(`${local.slice(0, 16)}:00Z`)
export const eventDate = (local: string) =>
  asUtc(local).toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
export const eventTimes = (start: string, end: string) =>
  start.slice(0, 10) === end.slice(0, 10)
    ? `${start.slice(11, 16)} – ${end.slice(11, 16)}`
    : `${start.slice(11, 16)} – ${eventDate(end)}, ${end.slice(11, 16)}`
export const rand = (cents: number) => (cents ? `R${(cents / 100).toFixed(2).replace(/\.00$/, '')}` : 'Free')
export const lines = (text: string) => String(text || '').split('\n').map((s) => s.trim()).filter(Boolean)
