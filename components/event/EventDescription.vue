<template>
  <section class="py-16 md:py-24 bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <h2 v-if="data.heading" class="text-3xl sm:text-4xl font-serif font-bold text-stone-800 mb-8 text-center">
          {{ data.heading }}
        </h2>
        <p class="text-lg text-stone-700 leading-relaxed whitespace-pre-line">{{ data.text }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ event: any; data: Record<string, string> }>()
</script>
