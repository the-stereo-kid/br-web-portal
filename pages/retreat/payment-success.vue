<template>
  <div>
    <NavBar />
    <section class="py-16 md:py-24 bg-stone-50 min-h-[60vh] flex items-center">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto text-center">
          <h1 class="text-3xl sm:text-4xl font-serif font-bold text-stone-800 mb-6">
            Payment Successful
          </h1>
          <p class="text-xl text-stone-600 mb-8">
            Thank you for securing your place at the Brothers Rising Conscious Men's Retreat.
          </p>
          <div class="bg-stone-100 rounded-xl p-6 text-left mb-8">
            <h2 class="text-lg font-semibold text-stone-800 mb-4">Retreat details</h2>
            <dl class="space-y-2 text-stone-600">
              <div><dt class="inline font-medium">Dates:</dt> <dd class="inline">13–15 March</dd></div>
              <div><dt class="inline font-medium">Location:</dt> <dd class="inline">Waterfall Farm</dd></div>
              <div><dt class="inline font-medium">Investment:</dt> <dd class="inline">R6,000 (all-inclusive)</dd></div>
            </dl>
          </div>
          <div class="bg-amber-50 border border-amber-200 rounded-xl p-6 text-left mb-8">
            <h2 class="text-lg font-semibold text-stone-800 mb-2">What happens next</h2>
            <p class="text-stone-600">
              You will receive a confirmation email from us shortly with further details. If you have any questions before the retreat, please reach out.
            </p>
          </div>
          <p class="text-stone-600 mb-6">
            <a
              href="mailto:brothersrisingsa@gmail.com"
              class="text-amber-600 hover:text-amber-700 underline font-medium"
            >
              brothersrisingsa@gmail.com
            </a>
          </p>
          <NuxtLink
            to="/retreat"
            class="inline-block px-8 py-3 bg-amber-600 text-white font-semibold rounded hover:bg-amber-700 transition-colors"
          >
            Back to retreat details
          </NuxtLink>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Payment Successful | Brothers Rising Retreat',
  meta: [
    {
      name: 'description',
      content: 'Your payment for the Brothers Rising Conscious Men\'s Retreat was successful. We look forward to seeing you.'
    }
  ]
})
</script>
