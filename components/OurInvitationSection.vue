<template>
  <section id="our-invitation" class="relative py-16 md:py-24 bg-stone-200">
    <!-- Background Image with Overlay -->
    <div
      id="our-invitation-bg"
      class="absolute inset-0 bg-cover bg-no-repeat"
      :style="{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: 'transparent'
      }"
    >
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl ml-auto mr-0 text-right">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-8">
          Our Invitation
        </h2>
        <div class="space-y-6 text-lg sm:text-xl text-white leading-relaxed">
          <p>
            We invite you to slow down.
          </p>
          <p>
            To listen more closely.
          </p>
          <p>
            To remember that you are not alone.
          </p>
          <p class="text-xl sm:text-2xl font-serif italic mt-8">
            Brothers Rising is not about fixing you — it's about walking alongside you as you reconnect with who you already are.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const backgroundImage = '/images/hilltop-circle-gathering-ocean-view.jpeg'
</script>

<style scoped>
/* Mobile: Show more of the image */
#our-invitation-bg {
  background-position: center center
}

/* Desktop: Focus on the center/upper section */
@media (min-width: 768px) {
  #our-invitation-bg {
    background-position: center 45%
  }
}

@media (min-width: 1024px) {
  #our-invitation-bg {
    background-position: center 40%
  }
}
</style>
