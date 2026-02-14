<template>
  <section id="retreat-who" class="py-16 md:py-24 bg-stone-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-8 text-center">
          Who This Retreat Is For
        </h2>
        <p class="text-lg text-stone-600 mb-6 text-center">
          This retreat is for men who:
        </p>
        <ul class="space-y-3 mb-8">
          <li
            v-for="(item, i) in traits"
            :key="i"
            class="flex items-start gap-3 text-stone-700"
          >
            <svg
              class="w-5 h-5 text-amber-600 shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span>{{ item }}</span>
          </li>
        </ul>
        <p class="text-lg text-stone-600 text-center mb-4">
          No prior experience with retreats, breathwork, or men's work is required.
        </p>
        <p class="text-lg text-stone-600 text-center">
          This space is welcoming, grounded, and held with care by three experienced facilitators.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const traits = [
  'Value deep connection and authentic brotherhood',
  'Are committed to personal growth and self-development',
  'Feel called to emotional and inner healing work',
  'Are open to reflection, embodiment, and conscious exploration',
  'Want to step into the next chapter of their lives with clarity and integrity'
]
</script>
