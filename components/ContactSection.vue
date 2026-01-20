<template>
  <section id="5" class="py-16 md:py-24 bg-stone-200">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <!-- Heading -->
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Keen to Connect? Reach Out!
          </h2>
          <a
            href="https://calendly.com/brothersrisingsa/30min"
            target="_blank"
            rel="noopener noreferrer"
            class="text-lg sm:text-xl text-white hover:text-amber-300 underline transition-colors"
          >
            Click Here To Book a 30 minute 1-1 Discovery Call
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Contact Information -->
          <div class="space-y-6">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-6 h-6 text-white mt-1">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <p class="text-white text-lg">
                6th Floor, The Barracks, 50 Bree St, Cape Town City Centre, Cape Town, 8000
              </p>
            </div>

            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-6 h-6 text-white mt-1">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <a
                href="tel:+27818465237"
                class="text-white text-lg hover:text-amber-300 transition-colors"
              >
                +27 81 846 5237
              </a>
            </div>

            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-6 h-6 text-white mt-1">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <a
                href="mailto:brothersrisingsa@gmail.com"
                class="text-white text-lg hover:text-amber-300 transition-colors"
              >
                brothersrisingsa@gmail.com
              </a>
            </div>
          </div>

          <!-- Contact Form -->
          <div>
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="contactName" class="block text-sm font-medium text-white mb-2">
                    Name
                  </label>
                  <input
                    id="contactName"
                    v-model="form.name"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <label for="contactEmail" class="block text-sm font-medium text-white mb-2">
                    Email
                  </label>
                  <input
                    id="contactEmail"
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div>
                <label for="message" class="block text-sm font-medium text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  required
                  rows="5"
                  class="w-full px-4 py-3 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent resize-none"
                  placeholder="Message"
                ></textarea>
              </div>

              <div v-if="mailerLite.error" class="text-red-200 text-sm">
                {{ mailerLite.error }}
              </div>

              <div v-if="mailerLite.success" class="text-green-200 text-sm">
                Thank you for your message! We'll get back to you soon.
              </div>

              <button
                type="submit"
                :disabled="mailerLite.isLoading"
                class="w-full px-6 py-3 bg-amber-600 text-white font-semibold uppercase text-sm tracking-wide rounded hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="!mailerLite.isLoading">Submit</span>
                <span v-else>Sending...</span>
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
  name: '',
  email: '',
  message: ''
})

const mailerLite = useMailerLite()

const handleSubmit = async () => {
  try {
    await mailerLite.submitContactForm({
      name: form.name,
      email: form.email,
      message: form.message
    })
    // Reset form on success
    form.name = ''
    form.email = ''
    form.message = ''
  } catch (error) {
    console.error('Contact form submission error:', error)
  }
}
</script>
