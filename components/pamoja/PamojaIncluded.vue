<template>
  <section id="pamoja-included" class="py-16 md:py-24 bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-stone-50 rounded-xl p-6 border border-stone-200">
            <h3 class="text-xl font-serif font-bold text-stone-800 mb-4">
              What You Bring:
            </h3>
            <ul class="space-y-2 text-stone-700">
              <li v-for="(item, i) in toBring" :key="i" class="flex items-start gap-3">
                <span class="text-amber-600 shrink-0 mt-0.5">•</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="bg-stone-50 rounded-xl p-6 border border-stone-200">
            <h3 class="text-xl font-serif font-bold text-stone-800 mb-4">
              What's Provided:
            </h3>
            <ul class="space-y-2 text-stone-700">
              <li v-for="(item, i) in provided" :key="i" class="flex items-start gap-3">
                <span class="text-amber-600 shrink-0 mt-0.5">•</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const toBring = [
  'Journal',
  'Refillable bottle',
  'Tea mug',
  'Comfy clothes',
  'Sports wear',
  'Towel',
  'Potluck food to share!'
]

const provided = [
  'Guided experiences through all four pillars',
  'A seat in the circle',
  'Reflection and integration opportunity'
]
</script>
