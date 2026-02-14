<template>
  <footer class="bg-white py-12 border-t border-stone-200">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Home -->
          <div>
            <h3 class="text-lg font-bold text-stone-800 mb-4">Home</h3>
            <p class="text-stone-600 text-sm">
              <NuxtLink to="/" class="hover:text-amber-600 transition-colors">Brothers Rising</NuxtLink>
            </p>
          </div>

          <!-- About Us -->
          <div>
            <h3 class="text-lg font-bold text-stone-800 mb-4">About Us</h3>
            <p class="text-stone-600 text-sm">
              <NuxtLink to="/#about" class="hover:text-amber-600 transition-colors">Our mission</NuxtLink>
            </p>
          </div>

        <!-- Retreat -->
        <div>
          <h3 class="text-lg font-bold text-stone-800 mb-4">Retreat</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/retreat" class="text-stone-600 hover:text-amber-600 transition-colors">
                Conscious Men's Retreat
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Social Media -->
        <div>
          <h3 class="text-lg font-bold text-stone-800 mb-3">Social Media</h3>
          <a
            href="https://www.instagram.com/brothers_rising/"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-stone-200 text-stone-700 hover:bg-amber-600 hover:text-white transition-colors"
            aria-label="Instagram"
          >
          <img src="/logos/Instagram_Glyph_Black.svg" alt="Instagram" class="w-4 h-4 object-contain" />
          </a>
        </div>
        </div>
      </div>
    </div>
  </footer>
</template>
