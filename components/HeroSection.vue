<template>
  <section
    id="home"
    class="relative min-h-screen flex items-center justify-center bg-stone-800"
  >
    <!-- Background Image with Overlay -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      :style="{
        backgroundImage: heroImage ? `url(${heroImage})` : 'none',
        backgroundColor: heroImage ? 'transparent' : '#78716c'
      }"
    >
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <!-- Logo/Icon Placeholder -->
      <div class="mb-6 flex justify-center">
        <div class="w-24 h-24 sm:w-32 sm:h-32 border-4 border-amber-600 rounded-full flex items-center justify-center">
          <svg
            class="w-16 h-16 sm:w-20 sm:h-20 text-amber-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
      </div>

      <!-- Main Title -->
      <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4">
        As Brothers, We Rise
      </h1>

      <!-- Tagline -->
      <p class="text-lg sm:text-xl md:text-2xl text-white mb-6 font-light max-w-3xl mx-auto">
        Building stronger, healthier, and more emotionally resilient men through the power of brotherhood, presence, and conscious connection.
      </p>

      <!-- Description -->
      <p class="text-base sm:text-lg md:text-xl text-white mb-4 font-light max-w-3xl mx-auto leading-relaxed">
        Brothers Rising is a South African men's wellbeing community dedicated to helping men reconnect with themselves, with other men, and with life itself. We create grounded, intentional spaces where men are supported to show up honestly, grow consciously, and rise together.
      </p>

      <!-- Closing Line -->
      <p class="text-lg sm:text-xl md:text-2xl text-white mb-8 font-serif italic">
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
const heroImage = ref<string | null>(null)

// Try to load hero image if available
onMounted(() => {
  // You can set this to your actual hero image path
  // heroImage.value = '/images/hero-background.jpg'
})

const scrollToOfferings = () => {
  const element = document.getElementById('offerings')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>
