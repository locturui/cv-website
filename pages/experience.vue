<template>
  <section class="max-w-6xl mx-auto py-16">
    <div class="text-center mb-12" data-aos="fade-up">
      <h2 class="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent inline-block">
        {{ $t('exp.title') }}
      </h2>
      <div class="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full"></div>
    </div>
    
    <ul
      class="p-5 lg:p-0 flex flex-col space-y-10 snap-y lg:flex-row
          lg:space-y-0 lg:space-x-12 lg:overflow-x-auto lg:snap-x lg:scroll-pl-6
          scrollable-x"
    >
      <li v-for="key in jobKeys" :key="key"
        class="relative flex flex-col snap-start lg:min-w-[22rem] py-6"
        data-aos="fade-right"
      >

        <div class="flex items-center lg:flex-col lg:items-start mb-5">
          <span class="font-bold text-md lg:mb-4 shrink-0 text-primary">
            {{ $t(`exp.jobs.${key}.year`) }}
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
            <h3 class="font-bold text-lg group-hover:text-primary transition-colors">{{ $t(`exp.jobs.${key}.role`) }}</h3>
            <p class="text-sm opacity-70 mt-1">{{ $t(`exp.jobs.${key}.company`) }}</p>

            <ul class="space-y-2 mt-4">
              <li
                v-for="(dummy, i) in $tm(`exp.jobs.${key}.bullets`).length"
                :key="i"
                class="flex gap-2 text-sm"
              >
                <span class="text-primary mt-1">▸</span>
                <span class="opacity-80">{{ $t(`exp.jobs.${key}.bullets[${i}]`) }}</span>
              </li>
            </ul>

            <div class="mt-4 p-3 bg-base-200/50 rounded-lg border border-base-300">
              <p class="text-xs font-semibold opacity-60 mb-1">{{ $t('exp.stackLabel') }}</p>
              <p class="text-sm opacity-80">{{ $t(`exp.jobs.${key}.tech`) }}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { Briefcase } from 'lucide-vue-next'
const jobKeys = ['excursioncrm', 'alumniportal', 'qpd', 'elbrus']
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