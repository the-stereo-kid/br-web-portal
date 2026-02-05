<template>
  <section id="who-this-is-for" class="relative py-16 md:py-24 bg-stone-800">
    <!-- Background Image with Overlay -->
    <div
      id="who-this-is-for-bg"
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
      <div class="max-w-4xl ml-0 mr-auto text-left">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-8">
          Who This Is For
        </h2>
        <p class="text-lg sm:text-xl text-white leading-relaxed mb-6">
          Brothers Rising is for men who:
        </p>
        <ul class="list-disc list-inside text-lg sm:text-xl text-white leading-relaxed space-y-3 max-w-2xl text-left">
          <li>Feel disconnected, stuck, or overwhelmed</li>
          <li>Are seeking deeper connection with themselves and others</li>
          <li>Want to grow emotionally, mentally, and consciously</li>
          <li>Value integrity, authenticity, and community</li>
          <li>Are ready to take responsibility for their wellbeing</li>
        </ul>
        <p class="text-lg sm:text-xl text-white leading-relaxed mt-8 italic">
          You don't need to have it all figured out. You simply need a willingness to show up.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const backgroundImage = '/images/retreat-yourself-group-embrace-unity-back-view.jpg'
</script>

<style scoped>
/* Mobile: Show more of the image */
#who-this-is-for-bg {
  background-position: center center
}

/* Desktop: Crop to focus on center section with most guys visible */
@media (min-width: 768px) {
  #who-this-is-for-bg {
    background-position: center 40%
  }
}

@media (min-width: 1024px) {
  #who-this-is-for-bg {
    background-position: center 35%
  }
}
</style>
