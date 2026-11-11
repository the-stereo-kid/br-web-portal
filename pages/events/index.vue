<template>
  <div class="bg-stone-100 min-h-screen">
    <NavBar solid />
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-16">
      <div class="max-w-4xl mx-auto">
        <div class="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 mb-5">
          <div>
            <p class="text-xs font-semibold uppercase tracking-widest text-amber-800 mb-1">Events</p>
            <h1 class="text-2xl sm:text-3xl font-serif font-bold text-stone-800">What's coming up</h1>
          </div>
          <p class="flex flex-wrap items-center gap-2 text-sm text-stone-700">
            <span>Add to your calendar:</span>
            <a :href="googleSubscribe" target="_blank" rel="noopener noreferrer" :class="subscribeBtn">Google</a>
            <a :href="webcal" :class="subscribeBtn">Apple / Outlook</a>
          </p>
        </div>

        <!-- One soft card holds the calendar and its legend -->
        <div class="bg-amber-50 rounded-3xl border border-stone-200 shadow-sm p-3 sm:p-5">
          <ClientOnly>
            <FullCalendar :options="options" class="br-calendar" />
            <template #fallback>
              <p class="text-stone-700 py-12 text-center">Loading the calendar…</p>
            </template>
          </ClientOnly>

          <p v-if="error" role="alert" class="mt-4 text-sm text-stone-700">The calendar could not be loaded right now. Please try again shortly.</p>

          <div class="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-stone-700">
            <span class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-stone-800" aria-hidden="true" />Brothers Rising</span>
            <span class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-amber-600" aria-hidden="true" />Community event</span>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/vue3/daygrid'
import listPlugin from '@fullcalendar/vue3/list'
import classicThemePlugin from '@fullcalendar/vue3/themes/classic'
import timeGridPlugin from '@fullcalendar/vue3/timegrid'
import '@fullcalendar/vue3/skeleton.css'
import '@fullcalendar/vue3/themes/classic/theme.css'

useHead({
  title: 'Events | Brothers Rising',
  meta: [{ name: 'description', content: 'Upcoming Brothers Rising circles, gatherings and community events. Subscribe to keep your own calendar up to date.' }]
})

const { data: events, error } = await useFetch<any[]>('/api/events', { default: () => [] })

const feed = `${useRuntimeConfig().public.siteUrl}/calendar.ics`.replace(/^https?:/, 'webcal:')
const webcal = feed
const googleSubscribe = `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(feed)}`
const subscribeBtn = 'inline-flex items-center min-h-[36px] px-4 rounded-full bg-white border border-stone-300 hover:border-stone-500 text-stone-800 font-semibold text-sm transition-colors'

// Rendered client-side only, so window is safe here.
const phone = import.meta.client && window.innerWidth < 640

const options = computed(() => ({
  plugins: [classicThemePlugin, dayGridPlugin, timeGridPlugin, listPlugin],
  initialView: phone ? 'listMonth' : 'dayGridMonth',
  headerToolbar: { left: 'prev,next today', center: 'title', right: phone ? 'listMonth,timeGridWeek,dayGridMonth' : 'dayGridMonth,timeGridWeek,listMonth' },
  buttonText: { today: 'Today', month: 'Month', week: 'Week', list: 'List' },
  // Event times arrive as South African local time; with a named zone and no timezone plugin the calendar shows them as written.
  timeZone: 'Africa/Johannesburg',
  firstDay: 1,
  height: 'auto',
  eventDisplay: 'block',
  // Month cells are narrow: show the title only there; week and list views still show times.
  views: { dayGridMonth: { displayEventTime: false } },
  dayMaxEvents: 3,
  slotMinTime: '06:00:00',
  allDaySlot: false,
  eventTimeFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
  noEventsContent: 'Nothing scheduled this month.',
  events: (events.value || []).map((e) => ({
    title: e.title,
    start: e.start,
    end: e.end,
    url: `/events/${e.slug}`,
    // Brothers Rising events are dark stone chips; community events are amber.
    color: e.source === 'community' ? '#d97706' : '#292524',
    contrastColor: e.source === 'community' ? '#1c1917' : '#fffbeb'
  }))
}))
</script>

<style>
/* FullCalendar's classic theme, recoloured to the site's stone and amber palette (replaces its palette.css). */
.br-calendar {
  --fc-classic-button: transparent;
  --fc-classic-button-border: transparent;
  --fc-classic-button-strong: #292524;
  --fc-classic-button-strong-border: #292524;
  --fc-classic-button-outline: #b45309;
  --fc-classic-button-foreground: #292524;
  --fc-classic-primary: #292524;
  --fc-classic-primary-foreground: #fffbeb;
  --fc-classic-event: #292524;
  --fc-classic-event-contrast: #fffbeb;
  --fc-classic-background-event: #b45309;
  --fc-classic-background-event-opacity: 15%;
  --fc-classic-background-event-foreground-opacity: 50%;
  --fc-classic-highlight: #fde68a66;
  --fc-classic-today: #fde68a66;
  --fc-classic-now: #b45309;
  --fc-classic-small-dot-width: 8px;
  --fc-classic-large-dot-width: 10px;
  --fc-classic-background: transparent;
  --fc-classic-faint: #0000000a;
  --fc-classic-muted: #0000000f;
  --fc-classic-strong: #00000024;
  --fc-classic-foreground: #292524;
  --fc-classic-faint-foreground: #78716c;
  --fc-classic-muted-foreground: #57534e;
  --fc-classic-border: #e7e5e4;
  --fc-classic-strong-border: #d6d3d1;
  font-size: 0.875rem;
}
/* The theme's class names are generated, so the extra rules hook onto roles and ARIA state instead. */

/* Controls: round, borderless, soft. */
.br-calendar button {
  min-height: 36px;
  border-radius: 9999px !important;
  font-weight: 600;
}
.br-calendar button:not([aria-selected='true']):not(:disabled):hover {
  background-color: #e7e5e4;
}
.br-calendar button[aria-label^='Previous'],
.br-calendar button[aria-label^='Next'] {
  width: 36px;
  padding: 0;
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgb(41 37 36 / 0.12);
}
/* Month / Week / List as one pill with a sliding dark thumb. */
.br-calendar [role='tablist'] {
  gap: 2px;
  padding: 3px;
  border-radius: 9999px;
  background-color: #e7e5e4;
}
.br-calendar [role='tablist'] button {
  min-height: 30px;
  padding: 0 0.9rem;
  border: 0;
}
.br-calendar button[aria-selected='true'] {
  color: #fffbeb;
}
.br-calendar [role='heading'] {
  font-family: Georgia, serif;
  font-size: 1.25rem;
  color: #292524;
}

/* Grid: hairlines only, rounded outer edge, shorter rows. */
.br-calendar > div:nth-child(2) > * {
  border-radius: 1rem;
  overflow: hidden;
  background-color: #ffffff99;
}
/* Week rows: enough room for a day number and two event pills, no more. */
/* FullCalendar sizes rows from the grid's width; pin them so the month stays an at-a-glance overview. */
.br-calendar [role='row']:has(> [role='cell'][data-date]) {
  flex-basis: 4.5rem !important;
  min-height: 4.5rem;
}
@media (max-width: 640px) {
  .br-calendar [role='row']:has(> [role='cell'][data-date]) {
    flex-basis: 3.25rem !important;
    min-height: 3.25rem;
  }
}
.br-calendar [role='columnheader'] {
  padding-block: 0.35rem;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #92400e;
}
/* Event pills in the month and week grids (list rows keep their full-width shape). */
.br-calendar [role='table'] a[href^='/events/'] {
  border-radius: 9999px;
  padding-inline: 0.5rem;
  font-weight: 600;
}
.br-calendar [role='list'] a[href^='/events/'] {
  font-weight: 600;
}
/* Phone: title and arrows share the first line, the view switch sits under them, "Today" is dropped. */
@media (max-width: 640px) {
  .br-calendar > div:first-child {
    flex-wrap: wrap;
    row-gap: 0.6rem;
  }
  .br-calendar > div:first-child > div:nth-child(2) {
    order: 1;
    flex: 1;
  }
  .br-calendar > div:first-child > div:nth-child(1) {
    order: 2;
  }
  .br-calendar > div:first-child > div:nth-child(3) {
    order: 3;
    flex-basis: 100%;
  }
  .br-calendar button[aria-label^='This'] {
    display: none;
  }
  .br-calendar [role='tablist'] {
    width: 100%;
  }
  .br-calendar [role='tablist'] button {
    flex: 1;
  }
}
</style>
