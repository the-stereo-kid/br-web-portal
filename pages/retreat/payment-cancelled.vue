<template>
  <div>
    <NavBar />
    <section class="py-16 md:py-24 bg-stone-50 min-h-[60vh] flex items-center">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto text-center">
          <h1 class="text-3xl sm:text-4xl font-serif font-bold text-stone-800 mb-6">
            Payment Cancelled
          </h1>
          <p class="text-xl text-stone-600 mb-8">
            Your payment was not completed. No charges have been made.
          </p>
          <p class="text-stone-600 mb-8">
            If you would like to try again or have questions about the retreat, please get in touch with us directly.
          </p>
          <div class="space-y-4">
            <NuxtLink
              to="/retreat"
              class="inline-block px-8 py-3 bg-amber-600 text-white font-semibold rounded hover:bg-amber-700 transition-colors"
            >
              Back to retreat & try again
            </NuxtLink>
            <p class="text-stone-500">
              <a
                href="mailto:brothersrisingsa@gmail.com?subject=Retreat%20Booking%20Question"
                class="text-amber-600 hover:text-amber-700 underline"
              >
                Contact us
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Payment Cancelled | Brothers Rising Retreat',
  meta: [
    {
      name: 'description',
      content: 'Your payment for the Brothers Rising Conscious Men\'s Retreat was cancelled.'
    }
  ]
})
</script>
