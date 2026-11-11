<template>
  <main class="bg-stone-100 min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-white rounded-xl p-8 border border-stone-200 shadow-sm">
      <h1 class="text-2xl font-serif font-bold text-stone-800 mb-2">Admin sign-in</h1>
      <p v-if="sent" role="status" class="text-stone-700">
        If that address is on the admin list, a sign-in link is on its way. It works for 15 minutes.
      </p>
      <form v-else class="space-y-4" @submit.prevent="send">
        <p v-if="route.query.expired" role="alert" class="text-red-800 bg-red-50 border border-red-200 rounded p-3 text-sm">
          That link has expired or is not valid. Request a new one.
        </p>
        <label class="block">
          <span class="block text-sm font-semibold text-stone-800 mb-1">Email</span>
          <input v-model="email" required type="email" autocomplete="email" class="w-full min-h-[44px] px-3 py-2 border border-stone-400 rounded" />
        </label>
        <p v-if="error" role="alert" class="text-red-800 text-sm">{{ error }}</p>
        <button type="submit" :disabled="busy" class="w-full min-h-[44px] bg-stone-900 hover:bg-stone-800 text-amber-50 font-semibold uppercase text-sm tracking-wide rounded disabled:opacity-60">
          Email me a sign-in link
        </button>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
useHead({ title: 'Admin sign-in | Brothers Rising', meta: [{ name: 'robots', content: 'noindex' }] })
const route = useRoute()
const email = ref('')
const sent = ref(false)
const busy = ref(false)
const error = ref('')

async function send() {
  busy.value = true
  error.value = ''
  try {
    await $fetch('/api/auth/login', { method: 'POST', body: { email: email.value } })
    sent.value = true
  } catch {
    error.value = 'The link could not be sent. Please try again.'
  }
  busy.value = false
}
</script>
