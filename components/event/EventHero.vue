<template>
  <section class="relative min-h-[85vh] sm:min-h-screen flex items-end justify-center bg-stone-800">
    <div
      v-if="event.hero_image_url"
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${event.hero_image_url})` }"
    />
    <div class="absolute inset-0 bg-black/50" />

    <div class="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-28 pb-16 sm:pb-20 md:pb-24">
      <p
        v-if="event.source === 'community'"
        class="inline-block mb-6 px-3 py-1 border border-amber-200 text-amber-100 text-xs font-semibold uppercase tracking-widest rounded"
      >
        Community event
      </p>
      <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 leading-tight">
        {{ event.title }}
      </h1>
      <p v-if="data.subtitle" class="text-lg sm:text-xl md:text-2xl text-amber-100 font-serif mb-6 max-w-2xl mx-auto">
        {{ data.subtitle }}
      </p>
      <p v-if="data.tagline" class="text-xl sm:text-2xl md:text-3xl text-white/95 font-serif mb-8 max-w-3xl mx-auto leading-relaxed">
        {{ data.tagline }}
      </p>
      <div class="inline-block px-6 py-3 bg-stone-900/90 border border-golden-brown text-amber-50 text-base sm:text-lg font-semibold tracking-wide rounded">
        {{ eventDate(event.starts_local) }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ event: any; data: Record<string, string> }>()
</script>
