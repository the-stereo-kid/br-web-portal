<template>
  <footer class="bg-white py-12 border-t border-stone-200">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- About Us -->
        <div>
          <h3 class="text-lg font-bold text-stone-800 mb-4">About Us</h3>
          <ul class="space-y-2">
            <li>
              <a href="#about" class="text-stone-600 hover:text-amber-600 transition-colors">
                Our Mission
              </a>
            </li>
            <li>
              <a href="#" class="text-stone-600 hover:text-amber-600 transition-colors">
                We're Hiring!
              </a>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h3 class="text-lg font-bold text-stone-800 mb-4">Resources</h3>
          <ul class="space-y-2">
            <li>
              <a href="#" class="text-stone-600 hover:text-amber-600 transition-colors">
                Tutorials
              </a>
            </li>
            <li>
              <a href="#" class="text-stone-600 hover:text-amber-600 transition-colors">
                Brand Assets
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact Us -->
        <div>
          <h3 class="text-lg font-bold text-stone-800 mb-4">Contact Us</h3>
          <ul class="space-y-2">
            <li class="text-stone-600">
              <a href="tel:+27818465237" class="hover:text-amber-600 transition-colors">
                +27 81 846 5237
              </a>
              <span class="mx-2">/</span>
              <a href="tel:+27828196910" class="hover:text-amber-600 transition-colors">
                +27 82 819 6910
              </a>
            </li>
            <li>
              <a
                href="mailto:brothersrisingsa@gmail.com"
                class="text-stone-600 hover:text-amber-600 transition-colors"
              >
                brothersrisingsa@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="text-center text-stone-600 text-sm border-t border-stone-200 pt-8">
        <p>&copy; {{ currentYear }} Brothers Rising. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
