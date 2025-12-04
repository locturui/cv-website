<script setup lang="ts">
const { locale, setLocale, locales } = useI18n()

const showDropdown = ref(false)
const isMobile = ref(false)

const localeNames: Record<string, string> = {
  en: 'EN',
  ru: 'РУ',
  ko: '한'
}

const currentLocaleName = computed(() => localeNames[locale.value] || locale.value.toUpperCase())

function selectLocale(localeCode: string) {
  setLocale(localeCode as 'en' | 'ru' | 'ko')
  showDropdown.value = false
}

function handleMouseEnter() {
  if (!isMobile.value) {
    showDropdown.value = true
  }
}

function handleMouseLeave() {
  if (!isMobile.value) {
    showDropdown.value = false
  }
}

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.language-switcher-container')) {
    showDropdown.value = false
  }
}

onMounted(() => {
  isMobile.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  if (isMobile.value) {
    document.addEventListener('click', handleClickOutside)
  }
})

onBeforeUnmount(() => {
  if (isMobile.value) {
    document.removeEventListener('click', handleClickOutside)
  }
})
</script>

<template>
  <div 
    class="relative language-switcher-container"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="flex flex-col">
      <button 
        @click="toggleDropdown"
        :class="[
          'w-10 h-10 flex items-center justify-center rounded-t-xl transition-all group font-semibold text-sm',
          showDropdown ? 'bg-base-200/50' : 'hover:bg-base-200/50 rounded-xl'
        ]"
      >
        {{ currentLocaleName }}
      </button>
      
      <Transition name="dropdown">
        <div 
          v-if="showDropdown"
          class="absolute top-full right-0 w-10 bg-base-100 rounded-b-xl shadow-2xl border border-base-300 border-t-0 overflow-hidden z-50"
        >
          <button
            v-for="loc in locales"
            :key="loc.code"
            v-show="locale !== loc.code"
            @click="selectLocale(loc.code)"
            :class="[
              'w-full h-10 flex items-center justify-center text-sm font-semibold transition-all hover:bg-primary hover:text-primary-content border-b border-base-300 last:border-b-0',
              'text-base-content'
            ]"
          >
            {{ localeNames[loc.code] || loc.code.toUpperCase() }}
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
  transform-origin: top;
}

.dropdown-enter-from {
  opacity: 0;
  transform: scaleY(0);
}

.dropdown-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>
