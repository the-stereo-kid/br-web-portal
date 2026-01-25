<template>
  <section id="sign-up" class="py-16 md:py-24 bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <!-- Left: Illustration -->
          <div class="hidden md:flex justify-center">
            <div class="w-48 h-48 text-amber-600">
              <svg
                class="w-full h-full"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
          </div>

          <!-- Right: Form -->
          <div>
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-4">
              Stay Connected
            </h2>
            <p class="text-lg sm:text-xl text-stone-600 mb-4 font-serif">
              Stay present. Get connected.
            </p>
            <p class="text-lg sm:text-xl text-stone-600 mb-8">
              Follow Brothers Rising to stay informed about upcoming gatherings, workshops, retreats, and community offerings.
            </p>
            <p class="text-lg sm:text-xl text-stone-600 mb-8 italic">
              Whether you're curious, cautious, or fully ready to step in — there is a place for you here.
            </p>

            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-stone-700 mb-2">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    v-model="form.firstName"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-stone-700 mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    v-model="form.lastName"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-stone-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                  placeholder="Email"
                />
              </div>

              <div v-if="mailerLite.error" class="text-red-600 text-sm">
                {{ mailerLite.error }}
              </div>

              <div v-if="mailerLite.success" class="text-green-600 text-sm">
                Thank you for subscribing! Check your email to confirm.
              </div>

              <button
                type="submit"
                :disabled="mailerLite.isLoading"
                class="w-full px-6 py-3 bg-amber-600 text-white font-semibold uppercase text-sm tracking-wide rounded hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="!mailerLite.isLoading">Submit</span>
                <span v-else>Submitting...</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const form = reactive({
  firstName: '',
  lastName: '',
  email: ''
})

const mailerLite = useMailerLite()

const handleSubmit = async () => {
  try {
    await mailerLite.subscribeToNewsletter({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email
    })
    // Reset form on success
    form.firstName = ''
    form.lastName = ''
    form.email = ''
  } catch (error) {
    console.error('Newsletter subscription error:', error)
  }
}
</script>
