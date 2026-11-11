<template>
  <section class="py-16 md:py-24 bg-stone-100">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto">
        <div class="bg-stone-900 rounded-xl p-6 sm:p-8 border-2 border-golden-brown shadow-xl">
          <h2 class="text-2xl sm:text-3xl font-serif font-bold text-amber-50 mb-8 text-center">Event Details</h2>
          <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-stone-200">
            <div v-for="row in rows" :key="row.label">
              <dt class="text-amber-200 text-sm font-semibold uppercase tracking-wide mb-1">{{ row.label }}</dt>
              <dd class="text-lg" :class="{ 'font-semibold text-amber-100': row.strong }">{{ row.value }}</dd>
            </div>
          </dl>
          <div v-if="data.note || data.footnote" class="mt-8 pt-6 border-t border-stone-700 text-center">
            <p v-if="data.note" class="text-amber-100 font-semibold mb-4">{{ data.note }}</p>
            <p v-if="data.footnote" class="text-sm text-stone-300">{{ data.footnote }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{ event: any; data: Record<string, string> }>()

const rows = computed(() =>
  [
    { label: 'Date', value: eventDate(props.event.starts_local) },
    { label: 'Time', value: eventTimes(props.event.starts_local, props.event.ends_local) },
    { label: 'Duration', value: props.data.duration },
    { label: 'Location', value: props.event.location },
    // The typed text wins; otherwise show the price of the tier currently on sale.
    { label: 'Investment', value: props.data.investment || (props.event.offer ? rand(props.event.offer.price_cents) : ''), strong: true }
  ].filter((r) => r.value)
)
</script>
