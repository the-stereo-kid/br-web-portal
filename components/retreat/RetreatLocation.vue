<template>
  <section id="retreat-location" class="py-16 md:py-24 bg-stone-100">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-8 lg:mb-10 text-center">
          The Location – Waterfall Farm
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10 lg:mb-14">
          <img
            :src="locationImages[0].src"
            :alt="locationImages[0].alt"
            class="w-full rounded-xl shadow-lg object-cover aspect-[4/3]"
          />
          <img
            :src="locationImages[1].src"
            :alt="locationImages[1].alt"
            class="w-full rounded-xl shadow-lg object-cover aspect-[4/3]"
          />
          <img
            :src="locationImages[2].src"
            :alt="locationImages[2].alt"
            class="w-full rounded-xl shadow-lg object-cover aspect-[4/3]"
          />
        </div>
        <div class="max-w-3xl mx-auto">
          <p class="text-lg text-stone-600 leading-relaxed mb-6">
            Nestled in nature, <strong class="text-stone-800">Waterfall Farm</strong> offers a powerful setting for retreat work — combining comfort, simplicity, and connection to the land.
          </p>
          <p class="text-lg text-stone-600 leading-relaxed mb-6">
            Accommodation will be in <strong class="text-stone-800">shared glamping-style bell tents</strong> — beautifully appointed spaces that allow for both rest and a sense of communal living that supports the retreat container.
          </p>
          <p class="text-lg text-stone-600 leading-relaxed mb-6">
            Each tent sleeps 2 people, creating the opportunity to build stronger bonds with your brothers.
          </p>
          <p class="text-lg text-stone-600 leading-relaxed">
            The land itself is part of the experience, inviting stillness, reflection, and grounding throughout the weekend.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const locationImages = [
  { src: '/images/BR_Retreat_x_Waterfall_Farm/WF_1-the_waterfall.jpg', alt: 'The waterfall at Waterfall Farm — natural pool and rock formations' },
  { src: '/images/BR_Retreat_x_Waterfall_Farm/bell_tent.jpg', alt: 'Glamping-style bell tent interior at Waterfall Farm' },
  { src: '/images/BR_Retreat_x_Waterfall_Farm/WF_4-lit_up_tent.jpg', alt: 'Bell tent lit up at night at Waterfall Farm' }
]
</script>
