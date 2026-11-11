<template>
  <div class="bg-stone-100 min-h-screen">
    <NavBar solid />
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-16">
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
            <p class="text-sm font-semibold uppercase tracking-widest text-amber-800 mb-1">Events</p>
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-800">What's coming up</h1>
          </div>
          <div class="text-sm text-stone-700">
            <p class="font-semibold uppercase tracking-wide text-stone-800 mb-2">Subscribe to the calendar</p>
            <div class="flex flex-wrap gap-3">
              <a :href="googleSubscribe" target="_blank" rel="noopener noreferrer" :class="subscribeBtn">Google Calendar</a>
              <a :href="webcal" :class="subscribeBtn">Apple / Outlook</a>
            </div>
          </div>
        </div>

        <ClientOnly>
          <FullCalendar :options="options" class="br-calendar" />
          <template #fallback>
            <p class="text-stone-700 py-16 text-center">Loading the calendar…</p>
          </template>
        </ClientOnly>

        <p v-if="error" role="alert" class="mt-6 text-stone-700">The calendar could not be loaded right now. Please try again shortly.</p>

        <div class="mt-6 flex flex-wrap gap-6 text-sm text-stone-700">
          <span class="flex items-center gap-2"><span class="w-3.5 h-3.5 rounded-sm bg-stone-800" aria-hidden="true" />Brothers Rising</span>
          <span class="flex items-center gap-2"><span class="w-3.5 h-3.5 rounded-sm bg-amber-600" aria-hidden="true" />Community event</span>
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
const subscribeBtn = 'inline-flex items-center min-h-[44px] px-4 bg-stone-800 hover:bg-stone-900 text-amber-50 font-semibold uppercase text-xs tracking-wide rounded transition-colors'

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
  --fc-classic-button: #ffffff;
  --fc-classic-button-border: #a8a29e;
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
  --fc-classic-today: #fde68a80;
  --fc-classic-now: #b45309;
  --fc-classic-small-dot-width: 8px;
  --fc-classic-large-dot-width: 10px;
  --fc-classic-background: #fffbeb;
  --fc-classic-faint: #0000000a;
  --fc-classic-muted: #00000014;
  --fc-classic-strong: #00000024;
  --fc-classic-foreground: #292524;
  --fc-classic-faint-foreground: #78716c;
  --fc-classic-muted-foreground: #57534e;
  --fc-classic-border: #d6d3d1;
  --fc-classic-strong-border: #a8a29e;
}
/* The theme's class names are generated, so the few extra rules hook onto roles and ARIA state instead. */
.br-calendar button {
  min-height: 44px;
  font-weight: 600;
}
.br-calendar button[aria-selected='true'] {
  color: #fffbeb;
}
.br-calendar [role='heading'] {
  font-family: Georgia, serif;
  color: #292524;
}
.br-calendar [role='columnheader'] {
  padding-block: 0.4rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #92400e;
}
.br-calendar a[href^='/events/'] {
  font-weight: 600;
}
</style>
