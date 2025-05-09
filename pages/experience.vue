<template>
  <section class="max-w-5xl mx-auto py-16">
    <h2 class="text-4xl font-bold mb-10 text-center">Experience</h2>
    <ul
      class="p-5 lg:p-0 flex flex-col space-y-10 snap-y lg:flex-row
          lg:space-y-0 lg:space-x-12 lg:overflow-x-auto lg:snap-x lg:scroll-pl-6"
    >
      <li
        v-for="(job, i) in jobs"
        :key="job.role + job.company"
        class="relative flex flex-col snap-start lg:min-w-[20rem]"
      >

        <div class="flex items-center lg:flex-col lg:items-start mb-5">
          <span class="font-semibold text-md lg:mb-4 shrink-0">
            {{ job.year }}
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
                 ring-1 ring-base-200 w-full"
        >
          <h3 class="font-semibold">{{ job.role }}</h3>
          <p class="text-sm opacity-70">{{ job.company }}</p>

          <ul class="list-disc list-inside mt-2 space-y-1 text-sm">
            <li v-for="b in job.bullets" :key="b">{{ b }}</li>
          </ul>

          <p class="mt-3 text-xs opacity-60 italic">
            Stack: {{ job.tech }}
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { Briefcase } from 'lucide-vue-next'

const jobs = [
  {
    year: 'Apr 2025 – Now',
    role: 'Frontend Developer',
    company: 'ExcursionCRM · Innopolis University',
    bullets: [
      'Developing booking & schedule UI with Nuxt 3 and Pinia',
      'Implemented dynamic form builder and interactive map view',
    ],
    tech: 'Vue 3, Nuxt 3, Tailwind CSS, Pinia',
  },
  {
    year: 'Jun 2024 – Jul 2024',
    role: 'Lead Frontend Developer',
    company: 'AlumniPortal · Innopolis University',
    bullets: [
      'Architected portal layout, authentication flow, API integration',
      'Mentored two junior developers and established component library',
    ],
    tech: 'Vue 3, Nuxt 3, Tailwind CSS, Pinia',
  },
  {
    year: 'Jan 2022 – Aug 2022',
    role: 'Junior Frontend Developer',
    company: 'QPD (Vodafone project)',
    bullets: [
      'Built React + TypeScript interfaces for internal CRM',
      'Optimised large data tables and crafted custom UI components',
    ],
    tech: 'React, TypeScript, Redux, REST API',
  },
  {
    year: 'Jul 2021 – Dec 2021',
    role: 'Full‑Stack Dev Intern (Bootcamp)',
    company: 'Elbrus Coding Bootcamp',
    bullets: [
      'ECO‑FRIEND: map‑based recycling web‑app (React + Node)',
      'MEBEL CRM: furniture company CRM (Handlebars + Node)',
    ],
    tech: 'React, Node.js, MongoDB, PostgreSQL',
  },
]
</script>
