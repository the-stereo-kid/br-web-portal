<template>
  <section id="retreat-invitation" class="relative py-16 md:py-24 min-h-[400px] flex items-center justify-center overflow-hidden">
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${invitationImage})` }"
    >
      <div class="absolute inset-0 bg-black/60" />
    </div>
    <div class="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-8">
        An Invitation
      </h2>
      <p class="text-lg text-white/95 mb-6">
        This retreat is an invitation to:
      </p>
      <ul class="space-y-3 mb-8 text-white">
        <li class="flex items-center justify-center gap-2">
          <span class="text-amber-400">•</span>
          <span>Step away from old patterns</span>
        </li>
        <li class="flex items-center justify-center gap-2">
          <span class="text-amber-400">•</span>
          <span>Listen to what's calling within you</span>
        </li>
        <li class="flex items-center justify-center gap-2">
          <span class="text-amber-400">•</span>
          <span>Be seen and supported by other men</span>
        </li>
        <li class="flex items-center justify-center gap-2">
          <span class="text-amber-400">•</span>
          <span>Leave grounded, clearer, and more connected</span>
        </li>
      </ul>
      <p class="text-xl font-serif text-white italic">
        Arrive as you are, and leave with a deeper connection and relationship with yourself and your new brothers.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
const invitationImage = '/images/retreat-yourself-forest-group-embrace-unity.jpg'
</script>
