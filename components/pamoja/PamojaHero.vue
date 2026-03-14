<template>
  <section
    id="pamoja-hero"
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

    <div class="absolute top-20 left-6 sm:top-24 sm:left-8 md:top-32 md:left-32 z-10">
      <img 
        src="/images/BR_logo_transparent_bg.png" 
        alt="Brothers Rising" 
        class="h-14 sm:h-16 md:h-48 w-auto opacity-90"
      />
    </div>

    <div class="absolute top-20 right-6 sm:top-24 sm:right-8 md:top-32 md:right-32 z-10">
      <img 
        src="/logos/gatheringofmen.avif" 
        alt="The Gathering of Men" 
        class="h-14 sm:h-16 md:h-48 w-auto opacity-90"
      />
    </div>

    <div class="relative z-10 flex flex-col justify-end min-h-[85vh] sm:min-h-screen pb-16 sm:pb-20 md:pb-24">
      <div class="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 leading-tight">
          The Spirit of Pamoja
        </h1>
        
        <p class="text-lg sm:text-xl md:text-2xl text-amber-100 font-serif mb-6 max-w-2xl mx-auto">
          Cape Town
        </p>
        
        <p class="text-xl sm:text-2xl md:text-3xl text-white/95 font-serif mb-8 max-w-3xl mx-auto leading-relaxed">
          Not a workshop, but a guided men's space
        </p>

        <div class="inline-block px-6 py-3 bg-amber-600/90 text-white text-base sm:text-lg font-semibold tracking-wide rounded">
          March 22nd, 2026
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const heroImage = '/images/ignite-the-warrior-2025-play.jpg'

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>
