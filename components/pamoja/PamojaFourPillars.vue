<template>
  <section id="pamoja-pillars" class="py-16 md:py-24 bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12 md:mb-16">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-4">
          The Four Pillars
        </h2>
        <p class="text-lg sm:text-xl text-stone-600 max-w-3xl mx-auto">
          We'll be moving through four essential dimensions of conscious masculinity, each one building on and balancing the others.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
        <article
          v-for="pillar in pillars"
          :key="pillar.title"
          class="bg-stone-50 rounded-xl p-6 sm:p-8 border border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex items-start gap-4 mb-4">
            <span class="text-4xl sm:text-5xl shrink-0">{{ pillar.emoji }}</span>
            <div>
              <h3 class="text-2xl sm:text-3xl font-serif font-bold text-stone-800 mb-2">
                {{ pillar.title }}
              </h3>
              <p class="text-base sm:text-lg text-stone-600 leading-relaxed">
                {{ pillar.description }}
              </p>
            </div>
          </div>
        </article>
      </div>

      <div class="mt-12 max-w-3xl mx-auto">
        <div class="bg-amber-50 rounded-xl p-6 sm:p-8 border-2 border-amber-200">
          <p class="text-lg sm:text-xl text-stone-700 leading-relaxed text-center font-serif">
            Power without peace? You endlessly chase distractions.<br />
            Peace without power? You're a dreamer without impact.<br />
            <strong class="text-amber-800">Combine them, and your purpose naturally emerges.</strong>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const pillars = [
  {
    title: 'Peace',
    description: 'Calmness within.'
  },
  {
    title: 'Power',
    description: 'Physical and mental strength.'
  },
  {
    title: 'Purpose',
    description: 'Clarity and direction.'
  },
  {
    title: 'Play',
    description: 'Approaching life lightly.'
  }
]
</script>
