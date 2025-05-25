<template>
  <section class="max-w-5xl mx-auto py-16">
    <h2 class="text-4xl font-bold mb-10 text-center">{{ $t('exp.title') }}</h2>
    <ul
      class="p-5 lg:p-0 flex flex-col space-y-10 snap-y lg:flex-row
          lg:space-y-0 lg:space-x-12 lg:overflow-x-auto lg:snap-x lg:scroll-pl-6
          scrollable-x"
    >
      <li v-for="key in jobKeys" :key="key"
        class="relative flex flex-col snap-start lg:min-w-[20rem] py-6"
      >

        <div class="flex items-center lg:flex-col lg:items-start mb-5">
          <span class="font-semibold text-md lg:mb-4 shrink-0">
            {{ $t(`exp.jobs.${key}.year`) }}
          </span>
          <span
            class="hidden lg:inline-flex items-center justify-center
                   w-5 h-5 bg-primary text-base-100 rounded-full ml-2 lg:ml-0"
          >
            <Briefcase class="w-3 h-3" />
          </span>
        </div>
        <div
          class="mt-4 lg:mt-0 p-6 bg-base-100 shadow-md rounded-box
                 ring-1 ring-base-200 w-full h-full"
        >
          <h3 class="font-semibold">{{ $t(`exp.jobs.${key}.role`) }}</h3>
          <p class="text-sm opacity-70">{{ $t(`exp.jobs.${key}.company`) }}</p>

          <ul class="list-disc list-inside mt-2 space-y-1 text-sm">
            <li
              v-for="(dummy, i) in $tm(`exp.jobs.${key}.bullets`).length"
              :key="i"
            >
              {{ $t(`exp.jobs.${key}.bullets[${i}]`) }}
            </li>
          </ul>

          <p class="mt-3 text-xs opacity-60 italic">
            {{ $t('exp.stackLabel') }}: {{ $t(`exp.jobs.${key}.tech`) }}
          </p>
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