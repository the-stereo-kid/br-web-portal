<template>
  <section
    id="home"
    class="relative min-h-screen flex items-center justify-center bg-stone-800"
  >
    <!-- Background Image with Overlay -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      :style="{
        backgroundImage: `url(${heroImage})`,
        backgroundColor: 'transparent'
      }"
    >
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <!-- Logo -->
      <div class="mb-4 sm:mb-6 flex justify-center">
        <!-- Logo with thin golden brown border and background -->
        <div class="p-3 sm:p-4 md:p-5 lg:p-6 border-[1.5px] border-golden-brown rounded-full bg-black bg-opacity-60 backdrop-blur-sm shadow-2xl">
          <img
            :src="logoImage"
            alt="Brothers Rising Logo"
            class="h-20 sm:h-28 md:h-36 lg:h-44 xl:h-52 w-auto object-contain drop-shadow-lg"
          />
        </div>
      </div>

      <!-- Main Title -->
      <h1 class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-3 sm:mb-4 leading-tight">
        As brothers, we rise
      </h1>

      <!-- Tagline -->
      <p class="text-base sm:text-xl md:text-2xl text-white mb-4 sm:mb-6 font-light max-w-3xl mx-auto leading-snug">
        Building stronger, healthier, and more emotionally resilient men through the power of brotherhood, presence, and conscious connection.
      </p>

      <!-- Description -->
      <p class="text-sm sm:text-lg md:text-xl text-white mb-4 sm:mb-4 font-light max-w-3xl mx-auto leading-relaxed">
        Brothers Rising is a South African men's wellbeing community dedicated to helping men reconnect with themselves, with other men, and with life itself. We create grounded, intentional spaces where men are supported to show up honestly, grow consciously, and rise together.
      </p>

      <!-- Closing Line -->
      <p class="text-base sm:text-xl md:text-2xl text-white mb-6 sm:mb-8 font-serif italic">
        Join us as a stranger. Leave as a brother.
      </p>

      <!-- CTA Button -->
      <button
        @click="scrollToOfferings"
        class="px-8 py-3 bg-amber-600 text-white font-semibold uppercase text-sm tracking-wide rounded hover:bg-amber-700 transition-colors shadow-lg"
      >
        Learn More
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
// Set hero banner image directly
const heroImage = '/images/brothers-rising-nature-circle-unity-banner.jpg'
const logoImage = '/images/BR_logo_transparent_bg.png'

const scrollToOfferings = () => {
  const element = document.getElementById('offerings')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>
