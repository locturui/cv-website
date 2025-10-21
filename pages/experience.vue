<template>
  <section class="max-w-6xl mx-auto py-16">
    <div class="text-center mb-12" data-aos="fade-up">
      <h2 class="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent inline-block">
        {{ $t('exp.title') }}
      </h2>
      <div class="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full"></div>
    </div>
    
    <ul
      v-if="pending"
      class="p-5 lg:p-0 flex flex-col space-y-10 snap-y lg:flex-row
          lg:space-y-0 lg:space-x-12 lg:overflow-x-auto lg:snap-x lg:scroll-pl-6
          scrollable-x"
    >
      <li v-for="i in 4" :key="i"
        class="relative flex flex-col snap-start lg:min-w-[22rem] py-6"
      >
        <div class="flex items-center lg:flex-col lg:items-start mb-5">
          <div class="h-5 w-32 bg-base-300 rounded animate-pulse"></div>
          <div class="hidden lg:block w-8 h-8 bg-base-300 rounded-full ml-2 lg:ml-0 animate-pulse"></div>
        </div>
        <div class="mt-4 lg:mt-0 p-6 bg-gradient-to-br from-base-100 to-base-200/50 shadow-xl rounded-2xl ring-1 ring-base-300 w-full h-full">
          <div class="space-y-4">
            <div class="h-6 bg-base-300 rounded w-3/4 animate-pulse"></div>
            <div class="h-4 bg-base-300 rounded w-1/2 animate-pulse"></div>
            <div class="space-y-2 mt-4">
              <div class="h-4 bg-base-300 rounded w-full animate-pulse"></div>
              <div class="h-4 bg-base-300 rounded w-5/6 animate-pulse"></div>
              <div class="h-4 bg-base-300 rounded w-4/5 animate-pulse"></div>
            </div>
            <div class="mt-4 p-3 bg-base-200/50 rounded-lg">
              <div class="h-3 bg-base-300 rounded w-1/4 mb-2 animate-pulse"></div>
              <div class="h-4 bg-base-300 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div v-else-if="error" class="text-center py-10">
      <p class="text-error mb-4">Failed to load experience</p>
      <button @click="refresh()" class="custom-btn custom-btn-primary">Try Again</button>
    </div>

    <ul
      v-else
      class="p-5 lg:p-0 flex flex-col space-y-10 snap-y lg:flex-row
          lg:space-y-0 lg:space-x-12 lg:overflow-x-auto lg:snap-x lg:scroll-pl-6
          scrollable-x"
    >
      <li v-for="exp in experiences" :key="exp.key"
        class="relative flex flex-col snap-start lg:min-w-[22rem] py-6"
        data-aos="fade-right"
      >

        <div class="flex items-center lg:flex-col lg:items-start mb-5">
          <span class="font-bold text-md lg:mb-4 shrink-0 text-primary">
            {{ exp.year }}
          </span>
          <span
            class="hidden lg:inline-flex items-center justify-center
                   w-8 h-8 bg-gradient-to-br from-primary to-secondary text-base-100 rounded-full ml-2 lg:ml-0 shadow-lg"
          >
            <Briefcase class="w-4 h-4" />
          </span>
        </div>
        <div
          class="group mt-4 lg:mt-0 p-6 bg-gradient-to-br from-base-100 to-base-200/50 shadow-xl rounded-2xl
                 ring-1 ring-base-300 w-full h-full hover:shadow-2xl transition-all duration-500
                 hover:-translate-y-1 hover:ring-primary/30 relative overflow-hidden"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="relative z-10">
            <h3 class="font-bold text-lg group-hover:text-primary transition-colors">{{ exp.role }}</h3>
            <p class="text-sm opacity-70 mt-1">{{ exp.company }}</p>

            <ul class="space-y-2 mt-4">
              <li
                v-for="(bullet, i) in exp.bullets"
                :key="i"
                class="flex gap-2 text-sm"
              >
                <span class="text-primary mt-1">▸</span>
                <span class="opacity-80">{{ bullet }}</span>
              </li>
            </ul>

            <div class="mt-4 p-3 bg-base-200/50 rounded-lg border border-base-300">
              <p class="text-xs font-semibold opacity-60 mb-1">{{ $t('exp.stackLabel') }}</p>
              <p class="text-sm opacity-80">{{ exp.tech }}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { Briefcase } from 'lucide-vue-next'

interface Experience {
  key: string
  year: string
  role: string
  company: string
  bullets: string[]
  tech: string
}

const { locale } = useI18n()

const { data: experiences, pending, error, refresh } = useFetch<Experience[]>('/api/experience', {
  query: { locale },
  key: `experience-${locale.value}`
})
</script>

<style scoped>
.scrollable-x {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}
.scrollable-x::-webkit-scrollbar {
  height: 8px;
}
.scrollable-x::-webkit-scrollbar-track {
  background: #e5e7eb;
  border-radius: 4px;
}
.scrollable-x::-webkit-scrollbar-thumb {
  background: #570DF8;
  border-radius: 4px;
}
.scrollable-x {
  scrollbar-width: thin;
  scrollbar-color: #570DF8 #e5e7eb;
}
</style>