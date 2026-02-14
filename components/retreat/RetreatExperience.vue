<template>
  <section id="retreat-experience" class="relative py-16 md:py-24 bg-stone-800 overflow-hidden">
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
      :style="{ backgroundImage: `url(${bgImage})` }"
    />
    <div class="absolute inset-0 bg-stone-900/60" />
    <div class="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-amber-50 mb-8 text-center">
          The Experience
        </h2>
        <p class="text-lg text-stone-200 mb-10 text-center">
          Throughout the weekend, we will also engage in:
        </p>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10">
          <li
            v-for="(item, i) in activities"
            :key="i"
            class="flex items-start gap-3 text-stone-200"
          >
            <span class="text-amber-500 shrink-0 mt-0.5 font-bold">•</span>
            <span><strong class="text-amber-100">{{ item.title }}</strong> {{ item.desc }}</span>
          </li>
        </ul>
        <p class="text-lg text-stone-200 text-center">
          There will be space for both depth and rest — moments of challenge balanced with integration, silence, and reflection.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const bgImage = '/images/mountain-summit-group-hike-aerial-view.jpg'

const activities = [
  { title: 'Guided hikes', desc: 'through the surrounding landscape' },
  { title: 'Fire ceremonies', desc: 'for reflection, release, and intention setting' },
  { title: 'Rewilding practices', desc: 'that invite the body and senses back into ancestral instinct, rhythm, and presence' },
  { title: "Men's circles", desc: 'rooted in confidentiality, respect, and brotherhood' },
  { title: 'Meditation and silent time', desc: 'for deep reflection and integration' },
  { title: 'Journal prompts and reflections', desc: 'to help you process your experiences and guide your next steps' }
]
</script>
