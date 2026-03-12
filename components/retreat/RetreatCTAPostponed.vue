<template>
  <section id="retreat-cta" class="py-16 md:py-24 bg-stone-900">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-amber-50 mb-6">
          Retreat Postponed
        </h2>
        <p class="text-xl text-stone-200 mb-6">
          The retreat has been delayed. New dates will be announced soon.
        </p>
        <p class="text-stone-300 mb-8">
          Join the waitlist to be notified when dates are confirmed and share what you're keen for.
        </p>

        <form
          v-if="!isSubmitted"
          class="text-left space-y-4 mb-10"
          @submit.prevent="handleSubmit"
        >
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="block text-sm font-medium text-amber-200 mb-1">First name</label>
              <input
                id="firstName"
                v-model="form.firstName"
                type="text"
                required
                class="w-full px-4 py-2 rounded bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Your first name"
              />
            </div>
            <div>
              <label for="lastName" class="block text-sm font-medium text-amber-200 mb-1">Last name</label>
              <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                required
                class="w-full px-4 py-2 rounded bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Your last name"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-amber-200 mb-1">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-2 rounded bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>

          <p
            v-if="errorMessage"
            class="text-red-400 text-sm"
          >
            {{ errorMessage }}
          </p>

          <button
            type="submit"
            class="w-full sm:w-auto inline-block min-h-[48px] px-8 py-3 bg-amber-600 text-white font-semibold uppercase text-sm tracking-wide rounded hover:bg-amber-700 transition-colors shadow-lg"
          >
            Join Waitlist
          </button>
        </form>

        <div
          v-else
          class="py-8"
        >
          <p class="text-xl text-amber-100 mb-4">
            You're on the list!
          </p>
          <p class="text-stone-300">
            We'll be in touch soon with updates and a feedback form.
          </p>
        </div>

        <p class="text-stone-300 mt-8 mb-6">
          For questions, please get in touch with us directly.
        </p>
        <div class="space-y-3 text-stone-200">
          <p>
            <a
              href="mailto:brothersrisingsa@gmail.com"
              class="text-amber-300 hover:text-amber-200 underline transition-colors"
            >
              brothersrisingsa@gmail.com
            </a>
          </p>
          <p class="pt-2">
            <a href="tel:+27818465237" class="hover:text-amber-300 transition-colors">081 846 5237</a>
            <span class="text-stone-500"> — Daniel Patrick</span>
          </p>
          <p>
            <a href="tel:+27603888294" class="hover:text-amber-300 transition-colors">060 388 8294</a>
            <span class="text-stone-500"> — Ieuan Uys</span>
          </p>
          <p>
            <a href="tel:+27828196910" class="hover:text-amber-300 transition-colors">082 819 6910</a>
            <span class="text-stone-500"> — Phivo Artimedes</span>
          </p>
        </div>
        <p class="mt-12 text-stone-400 font-serif italic">
          Brothers Rising Conscious Men's Retreat — reconnect, remember, and rise together.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const form = reactive({
  firstName: '',
  lastName: '',
  email: ''
})

const isSubmitted = ref(false)
const errorMessage = ref('')

async function handleSubmit() {
  errorMessage.value = ''

  try {
    await $fetch('/api/waitlist/signup', {
      method: 'POST',
      body: {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email
      }
    })
    isSubmitted.value = true
  } catch (err: any) {
    errorMessage.value = err.data?.message || err.message || 'Something went wrong. Please try again or contact us.'
  }
}
</script>
