<template>
  <main class="bg-stone-100 min-h-screen px-4 sm:px-6 lg:px-8 py-10">
    <div class="max-w-5xl mx-auto">
      <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 class="text-3xl font-serif font-bold text-stone-800">Events</h1>
        <div class="flex gap-3">
          <NuxtLink to="/events" class="inline-flex items-center min-h-[44px] px-4 border border-stone-400 text-stone-800 font-semibold text-sm rounded hover:bg-white">View calendar</NuxtLink>
          <NuxtLink to="/admin/events/new" class="inline-flex items-center min-h-[44px] px-4 bg-stone-900 hover:bg-stone-800 text-amber-50 font-semibold text-sm rounded">New event</NuxtLink>
        </div>
      </div>

      <p v-if="pending" class="text-stone-700">Loading…</p>
      <p v-else-if="error" role="alert" class="text-red-800">Could not load events: {{ error.data?.message || error.message }}</p>
      <p v-else-if="!events?.length" class="text-stone-700">No events yet. Create the first one.</p>

      <div v-else class="overflow-x-auto bg-white rounded-xl border border-stone-200">
        <table class="w-full text-left text-sm text-stone-800">
          <thead class="bg-stone-50 text-xs uppercase tracking-wide text-stone-700">
            <tr>
              <th class="px-4 py-3">Event</th>
              <th class="px-4 py-3">Starts</th>
              <th class="px-4 py-3">Status</th>
              <th class="px-4 py-3">Booked</th>
              <th class="px-4 py-3"><span class="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="e in events" :key="e.id" class="border-t border-stone-200">
              <td class="px-4 py-3">
                <span class="font-semibold">{{ e.title }}</span>
                <span v-if="e.source === 'community'" class="ml-2 text-xs text-amber-800 uppercase tracking-wide">Community</span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap">{{ e.starts_local.replace('T', ' ') }}</td>
              <td class="px-4 py-3">{{ e.status === 'published' ? 'Published' : 'Draft' }}</td>
              <td class="px-4 py-3">{{ e.cta_mode === 'external' ? '–' : e.booked }}</td>
              <td class="px-4 py-3 whitespace-nowrap text-right">
                <NuxtLink :to="`/admin/events/${e.id}`" class="underline font-semibold">Edit</NuxtLink>
                <NuxtLink :to="`/admin/events/new?from=${e.id}`" class="underline ml-4">Duplicate</NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
useHead({ title: 'Admin | Brothers Rising', meta: [{ name: 'robots', content: 'noindex' }] })

// Client-side only: the API is what's protected, and a 401 sends you to sign in.
const { data: events, pending, error } = await useFetch<any[]>('/api/admin/events', { server: false, lazy: true })
watch(error, (e) => e?.statusCode === 401 && navigateTo('/admin/login'), { immediate: true })
</script>
