<template>
    <div class="min-h-screen flex flex-col">
        <nav class="sticky top-0 z-[9999] px-4 py-3">
          <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-between gap-4 px-4 py-2 rounded-2xl backdrop-blur-2xl">
              <NuxtLink :to="localePath('/')" :class="['flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 group', menuOpen ? 'opacity-0 pointer-events-none' : '']">
                <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <span class="text-white font-bold text-sm">SL</span>
                </div>
              </NuxtLink>

              <div :class="['hidden md:flex items-center gap-1 px-2 py-1.5 rounded-xl bg-base-200/20 backdrop-blur-2xl border border-white/5 absolute left-1/2 transform -translate-x-1/2 transition-opacity duration-300', menuOpen ? 'opacity-0 pointer-events-none' : '']">
                <NuxtLink 
                  :to="localePath('/')" 
                  class="glass-nav-item">
                  {{ $t('nav.home') }}
                </NuxtLink>
                <NuxtLink 
                  :to="localePath('/skills')" 
                  class="glass-nav-item">
                  {{ $t('nav.skills') }}
                </NuxtLink>
                <NuxtLink 
                  :to="localePath('/experience')" 
                  class="glass-nav-item">
                  {{ $t('nav.exp') }}
                </NuxtLink>
                <NuxtLink 
                  :to="localePath('/projects')" 
                  class="glass-nav-item">
                  {{ $t('nav.projects') }}
                </NuxtLink>
                <NuxtLink 
                  :to="localePath('/contact')" 
                  class="glass-nav-item">
                  {{ $t('nav.contact') }}
                </NuxtLink>
              </div>

              <div class="flex items-center gap-2">
                <div :class="['transition-opacity duration-300', menuOpen ? 'opacity-0 pointer-events-none' : '']">
                  <LanguageSwitcher />
                </div>

                <button 
                  @click="toggleTheme"
                  :class="['w-10 h-10 flex items-center justify-center rounded-xl hover:bg-base-200/50 transition-all duration-300 group', menuOpen ? 'opacity-0 pointer-events-none' : '']">
                  <Sun v-if="theme === 'light'" class="w-5 h-5 text-warning group-hover:rotate-180 transition-transform duration-500" />
                  <Moon v-else class="w-5 h-5 text-primary group-hover:-rotate-12 transition-transform duration-500" />
                </button>

                <a
                  href="https://github.com/locturui" 
                  target="_blank" 
                  rel="noopener"
                  :class="['flex w-10 h-10 items-center justify-center rounded-xl hover:bg-base-200/50 hover:text-primary transition-all duration-300 group z-[10001]', menuOpen ? 'opacity-0 pointer-events-none' : '']"
                  aria-label="GitHub">
                  <Github class="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>

                <button 
                  @click="menuOpen = !menuOpen"
                  class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-base-200/50 transition-all cursor-pointer md:hidden relative z-[10000]" 
                  aria-label="Menu">
                  <Transition name="menu-icon" mode="out-in">
                    <Menu v-if="!menuOpen" class="w-5 h-5" key="menu" />
                    <X v-else class="w-5 h-5" key="close" />
                  </Transition>
                </button>

                <Teleport to="body">
                  <Transition name="mobile-menu">
                    <div 
                      v-if="menuOpen"
                      class="fixed top-0 left-0 right-0 bottom-0 z-[9998] block md:hidden bg-base-100"
                      @click="menuOpen = false">
                      
                      <div class="flex flex-col items-center justify-center h-full px-8 space-y-10">
                        <NuxtLink 
                          :to="localePath('/')" 
                          @click="menuOpen = false" 
                          class="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:scale-110 transition-transform duration-300">
                          {{ $t('nav.home') }}
                        </NuxtLink>
                        <NuxtLink 
                          :to="localePath('/skills')" 
                          @click="menuOpen = false" 
                          class="text-5xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent hover:scale-110 transition-transform duration-300">
                          {{ $t('nav.skills') }}
                        </NuxtLink>
                        <NuxtLink 
                          :to="localePath('/experience')" 
                          @click="menuOpen = false" 
                          class="text-5xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent hover:scale-110 transition-transform duration-300">
                          {{ $t('nav.exp') }}
                        </NuxtLink>
                        <NuxtLink 
                          :to="localePath('/projects')" 
                          @click="menuOpen = false" 
                          class="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent hover:scale-110 transition-transform duration-300">
                          {{ $t('nav.projects') }}
                        </NuxtLink>
                        <NuxtLink 
                          :to="localePath('/contact')" 
                          @click="menuOpen = false" 
                          class="text-5xl font-bold bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent hover:scale-110 transition-transform duration-300">
                          {{ $t('nav.contact') }}
                        </NuxtLink>
                      </div>
                    </div>
                  </Transition>
                </Teleport>
              </div>
            </div>
          </div>
        </nav>

        <main class="flex-1">
        <NuxtPage v-slot="{ Component, route }">
            <Transition name="page" mode="out-in" appear>
            <div :key="route.fullPath" class="page-wrapper">
                <component :is="Component" />
            </div>
            </Transition>
        </NuxtPage>
        </main>

    <footer class="bg-base-300 mt-12">
    <div class="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2 text-sm">
        <CircleUser class="w-5 h-5 shrink-0" />
        <span>© {{ year }} Stepan Leonov. All rights reserved.</span>
        </div>
        <div class="flex gap-3">
        <a
            href="https://t.me/peatubaeg"
            target="_blank"
            aria-label="Telegram"
            class="btn btn-ghost btn-circle hover:bg-primary/20 transition"
        >
            <Send class="w-5 h-5" />
        </a>
        <a
            href="mailto:leonovstepan.jobs@outlook.com"
            aria-label="Email"
            class="btn btn-ghost btn-circle hover:bg-primary/20 transition"
        >
            <Mail class="w-5 h-5" />
        </a>
        </div>
    </div>
    </footer>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Sun, Moon, Sparkles, Github, CircleUser, Mail, Send, Menu, X } from 'lucide-vue-next'

const localePath = useLocalePath()

const menuOpen = ref(false)
const route = useRoute()

const theme = ref<'light' | 'dark'>('light')
function applyTheme(value: 'light' | 'dark') {
    document.documentElement.setAttribute('data-theme', value)
    theme.value = value
}
function toggleTheme() {
    const next: 'light' | 'dark' = theme.value === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    localStorage.setItem('cv-theme', next)
}

onMounted(() => {
    const saved = localStorage.getItem('cv-theme') as 'light' | 'dark' | null
    applyTheme(saved ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
    AOS.init({ duration: 600, once: true, easing: 'ease-out-cubic' })
})

const router = useRouter()
router.afterEach(() => setTimeout(() => {
    AOS.refresh()
}, 250))

const year = computed(() => new Date().getFullYear())

watch(
  () => route.fullPath,
  () => { menuOpen.value = false }
)
</script>

<style>
.page-wrapper {
display: block;
}
.page-enter-from {
opacity: 0;
transform: translateY(20px);
}
.page-enter-active,
.page-leave-active {
transition: opacity 0.35s ease, transform 0.35s ease;
}
.page-leave-to {
opacity: 0;
transform: translateY(-20px);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
transition: opacity 0.3s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
opacity: 0;
}

.menu-icon-enter-active,
.menu-icon-leave-active {
transition: all 0.2s ease;
}
.menu-icon-enter-from,
.menu-icon-leave-to {
opacity: 0;
transform: rotate(90deg) scale(0.8);
}
</style>