<template>
  <section id="contact" class="py-16 md:py-24 bg-stone-200">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- Logo (same style as hero) -->
        <div class="flex justify-center mb-10">
          <div class="p-3 sm:p-4 md:p-5 border-[2px] border-golden-brown rounded-full bg-white bg-opacity-90 shadow-xl">
            <img
              :src="logoImage"
              alt="Brothers Rising"
              class="h-20 sm:h-24 md:h-28 w-auto object-contain"
            />
          </div>
        </div>

        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-4">
            Stay Connected
          </h2>
          <p class="text-lg text-stone-600 max-w-2xl mx-auto">
            Whether you want to talk one-to-one or get updates from the community — we're here.
          </p>
        </div>

        <!-- 1-1 Discovery call + Contact details -->
        <div class="bg-white/60 rounded-xl p-6 sm:p-8 mb-10 border border-stone-300/60">
          <h3 class="text-xl font-serif font-bold text-stone-800 mb-4">
            Talk to us
          </h3>
          <p class="text-stone-600 mb-4">
            Book a 30 minute call for support, discovery or get hold of us on these contact details.
          </p>
          <a
            href="https://calendly.com/brothersrisingsa/30min"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block px-5 py-2.5 bg-amber-600 text-white font-semibold text-sm tracking-wide rounded hover:bg-amber-700 transition-colors mb-6"
          >
            Book a 30 minute call
          </a>
          <div class="space-y-2 text-stone-700">
            <p>
              <span class="font-medium text-stone-800">Daniel Patrick: </span>
              <a href="tel:+27818465237" class="hover:text-amber-600 transition-colors">+27 81 846 5237</a>
            </p>
            <p>
              <span class="font-medium text-stone-800">Phivo Artimedes: </span>
              <a href="tel:+27828196910" class="hover:text-amber-600 transition-colors">+27 82 819 6910</a>
            </p>
            <p>
              <span class="font-medium text-stone-800">Ieuan Uys: </span>
              <a href="tel:+27603888294" class="hover:text-amber-600 transition-colors">+27 60 388 8294</a>
            </p>
            <p>
              <a href="mailto:brothersrisingsa@gmail.com" class="hover:text-amber-600 transition-colors">brothersrisingsa@gmail.com</a>
            </p>
          </div>
        </div>

        <!-- Newsletter -->
        <div class="bg-white/60 rounded-xl p-6 sm:p-8 mb-10 border border-stone-300/60">
          <h3 class="text-xl font-serif font-bold text-stone-800 mb-2">
            Newsletter
          </h3>
          <p class="text-stone-600 mb-6">
            Get updates on upcoming gatherings, workshops, retreats and community news. We only send what matters — no spam.
          </p>
          <form @submit.prevent="handleNewsletterSubmit" class="space-y-4">
            <div>
              <label for="newsletterEmail" class="block text-sm font-medium text-stone-700 mb-1">Email</label>
              <input
                id="newsletterEmail"
                v-model="newsletterForm.email"
                type="email"
                required
                class="w-full px-4 py-2.5 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                placeholder="Email"
              />
            </div>
            <div v-if="newsletterStatus.error" class="text-red-600 text-sm">{{ newsletterStatus.error }}</div>
            <div v-if="newsletterStatus.success" class="text-green-700 text-sm">Thanks — check your email to confirm.</div>
            <button
              type="submit"
              :disabled="newsletterStatus.isLoading"
              class="w-full sm:w-auto px-6 py-2.5 bg-amber-600 text-white font-semibold text-sm tracking-wide rounded hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ newsletterStatus.isLoading ? 'Submitting…' : 'Subscribe' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const logoImage = '/images/BR_logo_transparent_bg.png'

const newsletterForm = reactive({
  email: ''
})

const mailerLite = useMailerLite()

const newsletterStatus = reactive({
  isLoading: false,
  error: '',
  success: false
})

const handleNewsletterSubmit = async () => {
  newsletterStatus.error = ''
  newsletterStatus.success = false
  newsletterStatus.isLoading = true
  try {
    await mailerLite.subscribeToNewsletter({
      email: newsletterForm.email
    })
    newsletterForm.email = ''
    newsletterStatus.success = true
  } catch (err: unknown) {
    const msg = (err as { message?: string })?.message || (err as { data?: { message?: string } })?.data?.message
    newsletterStatus.error = msg || 'Something went wrong. Please try again.'
    console.error('Newsletter subscription error:', err)
  } finally {
    newsletterStatus.isLoading = false
  }
}
</script>
