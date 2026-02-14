<template>
  <section
    id="retreat-hero"
    class="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center bg-stone-800"
  >
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      :style="{
        backgroundImage: `url(${heroImage})`,
        backgroundColor: 'transparent'
      }"
    >
      <div class="absolute inset-0 bg-black/50" />
    </div>

    <div class="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <p class="text-amber-200/90 text-sm sm:text-base uppercase tracking-widest mb-3 sm:mb-4">
        13–15 March | Waterfall Farm
      </p>
      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-3 sm:mb-4 leading-tight">
        Brothers Rising Conscious Men's Retreat
      </h1>
      <p class="text-lg sm:text-xl md:text-2xl text-white/95 font-serif mb-6 sm:mb-8 max-w-3xl mx-auto">
        Step Out of the Noise. Return to Yourself. Rise with Your Brothers.
      </p>
      <button
        type="button"
        @click="scrollToSection('retreat-cta')"
        class="min-h-[44px] px-8 py-3 bg-amber-600 text-white font-semibold uppercase text-sm tracking-wide rounded hover:bg-amber-700 transition-colors shadow-lg"
      >
        Secure Your Place
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
const heroImage = '/images/ignite-the-warrior-2025-fire-circle-seated-gathering.jpg'

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>
