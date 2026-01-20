<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    ]"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo and Brand -->
        <div class="flex items-center space-x-2">
          <div class="flex flex-col">
            <span
              :class="[
                'text-sm font-bold uppercase tracking-wide',
                isScrolled ? 'text-stone-800' : 'text-white'
              ]"
            >
              Conscious
            </span>
            <span
              :class="[
                'text-xs font-semibold uppercase',
                isScrolled ? 'text-stone-600' : 'text-white'
              ]"
            >
              Mens Community
            </span>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6 lg:space-x-8">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            @click.prevent="scrollToSection(link.href)"
            :class="[
              'text-sm font-semibold uppercase tracking-wide transition-colors',
              isScrolled ? 'text-stone-800 hover:text-amber-600' : 'text-white hover:text-amber-300'
            ]"
          >
            {{ link.label }}
          </a>
          <a
            href="https://chat.whatsapp.com/I8Ca17ugAqcClOyxCjJGMa"
            target="_blank"
            rel="noopener noreferrer"
            :class="[
              'text-sm font-semibold uppercase tracking-wide transition-colors',
              isScrolled ? 'text-stone-800 hover:text-amber-600' : 'text-white hover:text-amber-300'
            ]"
          >
            WhatsApp Community
          </a>
          <button
            @click="scrollToSection('#5')"
            class="px-4 py-2 bg-amber-600 text-white font-semibold uppercase text-sm tracking-wide rounded hover:bg-amber-700 transition-colors"
          >
            Contact
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2"
          :class="isScrolled ? 'text-stone-800' : 'text-white'"
        >
          <svg
            v-if="!mobileMenuOpen"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="mobileMenuOpen"
        class="md:hidden absolute top-full left-4 right-4 mt-2 rounded-2xl shadow-xl overflow-hidden backdrop-blur-lg"
        :class="isScrolled ? 'bg-white/95' : 'bg-stone-900/95'"
      >
        <div class="px-6 py-6 space-y-1">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            @click.prevent="scrollToSection(link.href); mobileMenuOpen = false"
            :class="[
              'block text-sm font-semibold uppercase tracking-wide py-3 px-4 rounded-lg transition-all duration-200',
              isScrolled 
                ? 'text-stone-800 hover:bg-amber-50 hover:text-amber-600' 
                : 'text-white hover:bg-white/10 hover:text-amber-300'
            ]"
          >
            {{ link.label }}
          </a>
          <a
            href="https://chat.whatsapp.com/I8Ca17ugAqcClOyxCjJGMa"
            target="_blank"
            rel="noopener noreferrer"
            @click="mobileMenuOpen = false"
            :class="[
              'block text-sm font-semibold uppercase tracking-wide py-3 px-4 rounded-lg transition-all duration-200',
              isScrolled 
                ? 'text-stone-800 hover:bg-amber-50 hover:text-amber-600' 
                : 'text-white hover:bg-white/10 hover:text-amber-300'
            ]"
          >
            WhatsApp Community
          </a>
          <div class="pt-2">
            <button
              @click="scrollToSection('#5'); mobileMenuOpen = false"
              class="w-full px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold uppercase text-sm tracking-wide rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Offerings', href: '#offerings' },
  { label: 'About', href: '#about' },
  { label: 'Sign Up', href: '#sign-up' }
]

const scrollToSection = (href: string) => {
  const targetId = href.replace('#', '')
  const element = document.getElementById(targetId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 50
  }
  window.addEventListener('scroll', handleScroll)
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})
</script>
