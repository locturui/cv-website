<template>
    <div class="min-h-screen flex flex-col bg-base-200">
        <nav class="navbar bg-base-100 shadow-md sticky top-0 z-30 backdrop-blur">
        <div class="navbar-start">
            <NuxtLink to="/" class="btn btn-ghost text-xl font-bold gap-2 hover:opacity-80">
            <Sparkles class="w-5 h-5" /> {{ $t('nav.name') }}
            </NuxtLink>
        </div>

        <div class="navbar-center hidden md:flex">
            <ul class="menu menu-horizontal px-1 font-medium">
            <li><NuxtLink :to="localePath('/')">{{ $t('nav.home') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/skills')">{{ $t('nav.skills') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/experience')">{{ $t('nav.exp') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/projects')">{{ $t('nav.projects') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/contact')">{{ $t('nav.contact') }}</NuxtLink></li>
            </ul>
        </div>

        <div class="navbar-end gap-2">
            <LanguageSwitcher />

            <label class="swap swap-rotate btn btn-ghost btn-circle">
            <input type="checkbox" @change="toggleTheme" :checked="theme === 'dark'" />
            <Sun class="swap-off w-5 h-5" />
            <Moon class="swap-on w-5 h-5" />
            </label>

            <a
            href="https://github.com/locturui" target="_blank" rel="noopener"
            class="btn btn-ghost btn-circle hidden sm:inline-flex"
            aria-label="GitHub"
            >
            <Github class="w-5 h-5" />
            </a>

            <details 
                class="dropdown dropdown-end md:hidden"
                :open="menuOpen"
                @toggle="menuOpen = $event.target.open"
            >
            <summary class="btn btn-ghost btn-circle" aria-label="Menu">
                <Menu class="w-5 h-5" />
            </summary>
            <ul class="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40">
                <li><NuxtLink :to="localePath('/')" @click="menuOpen = false">{{ $t('nav.home') }}</NuxtLink></li>
                <li><NuxtLink :to="localePath('/skills')" @click="menuOpen = false">{{ $t('nav.skills') }}</NuxtLink></li>
                <li><NuxtLink :to="localePath('/experience')" @click="menuOpen = false">{{ $t('nav.exp') }}</NuxtLink></li>
                <li><NuxtLink :to="localePath('/projects')" @click="menuOpen = false">{{ $t('nav.projects') }}</NuxtLink></li>
                <li><NuxtLink :to="localePath('/contact')" @click="menuOpen = false">{{ $t('nav.contact') }}</NuxtLink></li>
            </ul>
            </details>
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
            <span>© {{ year }} Stepan Leonov. All rights reserved.</span>
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
import { Sun, Moon, Sparkles, Github, CircleUser, Mail, Send, Menu } from 'lucide-vue-next'

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
</style>