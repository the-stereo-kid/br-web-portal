<template>
  <NuxtLink
    :to="link"
    class="block w-full max-w-sm bg-stone-50 rounded-xl p-6 border border-stone-200 shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-200 text-center group"
  >    
    <div class="mb-4 flex justify-center">
      <div class="w-16 h-16 flex items-center justify-center text-amber-600">
        <svg
          class="w-full h-full"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.25"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    </div>
    
    <h4 class="text-xl font-serif font-bold text-stone-800 mb-2 group-hover:text-amber-700 transition-colors">
      {{ title }}
    </h4>
    
    <p class="text-stone-600 text-sm mb-4">
      {{ subtitle }}
    </p>
    
    <span class="text-amber-600 font-semibold text-sm uppercase tracking-wide group-hover:text-amber-700">
      View details
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  link: string
  badge?: string
}>()
</script>
