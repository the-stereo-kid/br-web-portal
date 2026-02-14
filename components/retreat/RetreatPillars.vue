<template>
  <section id="retreat-pillars" class="py-16 md:py-24 bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12 md:mb-16">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-4">
          What We'll Be Exploring
        </h2>
        <p class="text-lg sm:text-xl text-stone-600 max-w-3xl mx-auto">
          The retreat journey weaves together inner work, embodiment, and nature-based practices. Each experience is facilitated with care, respect, and long-term integration in mind.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        <article
          v-for="pillar in pillars"
          :key="pillar.title"
          class="bg-stone-50 rounded-xl p-6 sm:p-8 border border-stone-200 shadow-sm"
        >
          <h3 class="text-xl sm:text-2xl font-serif font-bold text-stone-800 mb-4">
            {{ pillar.title }}
          </h3>
          <div class="space-y-4 text-stone-600">
            <div v-for="block in pillar.blocks" :key="block.heading">
              <h4 class="font-semibold text-stone-700">{{ block.heading }}</h4>
              <p class="text-sm sm:text-base leading-relaxed">{{ block.body }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const pillars = [
  {
    title: '1: Connection to Self',
    blocks: [
      {
        heading: 'Breathwork & Meditation',
        body: 'Guided breath and meditation practices to support nervous system regulation, emotional release, and deeper self-awareness.'
      },
      {
        heading: 'Alignment & Values',
        body: 'Practices that refine clarity and presence, helping you explore what truly matters and define your values based on your truth.'
      }
    ]
  },
  {
    title: '2: Deep Work',
    blocks: [
      {
        heading: 'Shadow Work',
        body: 'Exploring the hidden or disowned parts of ourselves with compassion, bringing unconscious patterns into conscious awareness and empowerment.'
      },
      {
        heading: 'Inner Warrior Work',
        body: 'Reconnecting with the Warrior Archetype — healthy masculine strength, boundaries, courage, and self-leadership. This process allows participants to step into their full embodied conscious warrior self.'
      },
      {
        heading: 'Inner Child Work',
        body: 'Guided flows and prompts that create space to reconnect with your younger self with curiosity, care, and healing attention. Playful but held experiences to help you connect with your inner child and allow space for old wounds to be felt and nurtured.'
      }
    ]
  },
  {
    title: '3: Nature',
    blocks: [
      {
        heading: 'Reconnection to Nature',
        body: 'Grounding experiences that restore our relationship with the natural world as a source of wisdom, reflection, and support.'
      }
    ]
  }
]
</script>
