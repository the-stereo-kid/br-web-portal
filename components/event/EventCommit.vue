<template>
  <section id="commit" class="py-16 md:py-24 bg-amber-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-xl mx-auto text-center">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-8">
          {{ data.heading || 'Ready to commit?' }}
        </h2>

        <p v-if="event.past" class="text-lg text-stone-700">This event has passed.</p>

        <a
          v-else-if="event.cta_mode === 'external'"
          :href="event.external_url"
          target="_blank"
          rel="noopener noreferrer"
          :class="primary"
        >
          Book Here
        </a>

        <p v-else-if="event.soldOut" class="text-lg text-stone-700">
          <strong class="text-stone-900">Sold out.</strong> Every place has been taken.
        </p>

        <form v-else class="text-left bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4" @submit.prevent="book">
          <p class="text-stone-800">
            <strong class="font-serif text-xl">{{ event.offer.name }}</strong>
            <span class="block text-stone-700">
              {{ rand(event.offer.price_cents) }}<template v-if="event.offer.price_cents"> per person</template>
              · {{ event.offer.left }} {{ event.offer.left === 1 ? 'place' : 'places' }} left
            </span>
          </p>
          <label class="block">
            <span :class="label">Full name</span>
            <input v-model="form.name" required autocomplete="name" :class="input" />
          </label>
          <label class="block">
            <span :class="label">Email</span>
            <input v-model="form.email" required type="email" autocomplete="email" :class="input" />
          </label>
          <label class="block">
            <span :class="label">Phone</span>
            <input v-model="form.phone" required type="tel" autocomplete="tel" :class="input" />
          </label>
          <label class="block">
            <span :class="label">Places</span>
            <select v-model.number="form.quantity" :class="input">
              <option v-for="n in Math.min(4, event.offer.left)" :key="n" :value="n">{{ n }}</option>
            </select>
          </label>
          <p v-if="error" role="alert" class="text-red-800 bg-red-50 border border-red-200 rounded p-3 text-sm">{{ error }}</p>
          <button type="submit" :disabled="busy" :class="[primary, 'w-full disabled:opacity-60']">
            <template v-if="busy">One moment…</template>
            <template v-else-if="event.offer.price_cents">Pay {{ rand(event.offer.price_cents * form.quantity) }}</template>
            <template v-else>Reserve my place</template>
          </button>
          <p v-if="event.offer.price_cents" class="text-sm text-stone-600 text-center">
            You'll pay securely on Yoco. Your place is held for 15 minutes.
          </p>
        </form>

        <p v-if="!event.past" class="mt-8 text-sm text-stone-700">
          <a :href="event.googleLink" target="_blank" rel="noopener noreferrer" class="underline hover:text-amber-800">Add to Google Calendar</a>
          ·
          <a :href="`/api/events/${event.slug}/ics`" class="underline hover:text-amber-800">Download for Apple / Outlook</a>
        </p>
        <p class="mt-4 text-sm text-stone-700">
          <NuxtLink to="/#contact" class="underline hover:text-amber-800">Contact us for more info</NuxtLink>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{ event: any; data: Record<string, string> }>()

const primary = 'inline-block px-8 py-4 bg-stone-900 hover:bg-stone-800 text-amber-50 font-semibold uppercase text-sm tracking-wide rounded transition-colors duration-200 shadow-lg'
const label = 'block text-sm font-semibold text-stone-800 mb-1'
const input = 'w-full min-h-[44px] px-3 py-2 border border-stone-400 rounded bg-white text-stone-900'

const form = reactive({ name: '', email: '', phone: '', quantity: 1 })
const busy = ref(false)
const error = ref(useRoute().query.cancelled ? 'The payment was cancelled, so nothing was booked. You can try again below.' : '')

async function book() {
  busy.value = true
  error.value = ''
  try {
    const { redirectUrl } = await $fetch<{ redirectUrl: string }>(`/api/events/${props.event.slug}/book`, { method: 'POST', body: form })
    window.location.href = redirectUrl
  } catch (err: any) {
    error.value = err?.data?.message || 'Something went wrong. Please try again.'
    busy.value = false
  }
}
</script>
