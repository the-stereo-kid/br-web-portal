<template>
  <section class="py-16 md:py-24 bg-stone-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <p v-if="data.lead" class="text-xl sm:text-2xl text-stone-700 font-serif leading-relaxed text-center whitespace-pre-line">
          {{ data.lead }}
        </p>
        <div v-if="data.body" class="mt-12 bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-sm">
          <p class="text-lg text-stone-700 leading-relaxed whitespace-pre-line">{{ data.body }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ event: any; data: Record<string, string> }>()
</script>
