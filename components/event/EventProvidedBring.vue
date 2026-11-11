<template>
  <section class="py-16 md:py-24 bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="card in cards" :key="card.title" class="bg-stone-50 rounded-xl p-6 border border-stone-200">
          <h3 class="text-xl font-serif font-bold text-stone-800 mb-4">{{ card.title }}</h3>
          <ul class="space-y-2 text-stone-700">
            <li v-for="item in card.items" :key="item" class="flex items-start gap-3">
              <span class="text-amber-700 shrink-0 mt-0.5" aria-hidden="true">•</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{ event: any; data: Record<string, string> }>()

// One item per line in the admin form.
const cards = computed(() =>
  [
    { title: "What's Provided:", items: lines(props.data.provided) },
    { title: 'What You Bring:', items: lines(props.data.bring) }
  ].filter((c) => c.items.length)
)
</script>
