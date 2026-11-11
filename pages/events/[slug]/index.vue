<template>
  <div>
    <NavBar />
    <component :is="components[b.type]" v-for="b in blocks" :key="b.type" :event="event" :data="b.data" />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import EventCommit from '~/components/event/EventCommit.vue'
import EventDescription from '~/components/event/EventDescription.vue'
import EventDetails from '~/components/event/EventDetails.vue'
import EventHero from '~/components/event/EventHero.vue'
import EventIntro from '~/components/event/EventIntro.vue'
import EventProvidedBring from '~/components/event/EventProvidedBring.vue'

// Block type -> component. A new block type is one new component and one line here.
const components: Record<string, Component> = {
  hero: EventHero,
  intro: EventIntro,
  description: EventDescription,
  details: EventDetails,
  provided_bring: EventProvidedBring,
  commit: EventCommit
}

const slug = useRoute().params.slug as string
const { data: event, error } = await useFetch<any>(`/api/events/${slug}`)
if (error.value || !event.value) {
  throw createError({ statusCode: 404, statusMessage: 'Event not found', fatal: true })
}

const blocks = computed(() => mergeBlocks(event.value.blocks).filter((b) => b.enabled && components[b.type]))

useHead({
  title: `${event.value.title} | Brothers Rising`,
  meta: [{ name: 'description', content: `${event.value.title}, ${eventDate(event.value.starts_local)}${event.value.location ? `, ${event.value.location}` : ''}.` }]
})
</script>
