<template>
  <footer class="bg-white py-12 border-t border-stone-200">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                Retreat
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Social Media -->
        <div>
          <h3 class="text-lg font-bold text-stone-800 mb-4">Social Media</h3>
          <a
            href="https://www.instagram.com/brothers_rising/"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-stone-200 text-stone-700 hover:bg-amber-600 hover:text-white transition-colors"
            aria-label="Instagram"
          >
          <img src="/logos/Instagram_Glyph_Black.svg" alt="Instagram" class="w-5 h-5 object-contain" />
          </a>
        </div>
        </div>
      </div>
    </div>
  </footer>
</template>
