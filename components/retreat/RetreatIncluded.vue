<template>
  <section id="retreat-included" class="py-16 md:py-24 bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-8 text-center">
          What's Included
        </h2>
        <p class="text-2xl sm:text-3xl font-serif font-bold text-golden-brown text-center mb-10">
          All-inclusive retreat investment of R6,000
        </p>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <li
            v-for="(item, i) in included"
            :key="i"
            class="flex items-start gap-3 text-stone-700"
          >
            <span class="text-amber-600 shrink-0 mt-0.5" aria-hidden="true">•</span>
            <span>{{ item }}</span>
          </li>
        </ul>
        <p class="text-lg font-semibold text-stone-800 text-center mb-6">
          Everything is taken care of, so you can focus fully on the experience.
        </p>
        <p class="text-sm sm:text-base text-stone-500 text-center italic">
          Transport to and from the venue is not included, though carpool options may be available — please inquire for details.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const included = [
  "2 nights' accommodation in shared luxurious bell tents",
  'All organic, nourishing, and deliciously fresh meals and refreshments throughout the retreat',
  'Full facilitation of all workshops, circles, and practices by three experienced facilitators',
  'Guided hikes, ceremonies, and experiential sessions',
  'Access to retreat learning resources and post-retreat integration support'
]
</script>
