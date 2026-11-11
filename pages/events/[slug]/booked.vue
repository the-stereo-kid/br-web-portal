<template>
  <div class="bg-stone-100 min-h-screen flex flex-col">
    <NavBar solid />
    <main class="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
      <div class="max-w-xl mx-auto bg-stone-900 rounded-xl p-8 border-2 border-golden-brown shadow-xl text-center">
        <h1 class="text-3xl sm:text-4xl font-serif font-bold text-amber-50 mb-4">You're in.</h1>
        <p class="text-stone-200 text-lg leading-relaxed mb-8">
          Thank you, brother. A confirmation email with the details and a calendar invite is on its way. It can take a minute or two to arrive.
        </p>
        <NuxtLink
          :to="`/events/${slug}`"
          class="inline-block px-8 py-4 bg-amber-200 hover:bg-amber-100 text-stone-900 font-semibold uppercase text-sm tracking-wide rounded transition-colors"
        >
          Back to the event
        </NuxtLink>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
const slug = useRoute().params.slug as string
useHead({ title: "You're in | Brothers Rising", meta: [{ name: 'robots', content: 'noindex' }] })
</script>
