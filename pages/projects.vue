<template>
  <section class="max-w-6xl mx-auto py-16" data-aos="fade-up">
    <h2 class="text-4xl font-bold mb-10 text-center">Projects</h2>

    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCard
        v-for="p in projects"
        :key="p.title"
        :p="p"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const projects = [
  {
    title: 'AlumniPortal',
    desc:  'Portal for alumni of Innopolis University to connect and provide opportunities to current students.',
    link:  'https://github.com/locturui/alumni',
    image: '/img/alumni.png',
    stack: ['Vue', 'Nuxt', 'Pinia', 'Tailwind CSS'],
  },
  {
    title: 'Artpolly Studio',
    desc:  'Ceramics studio website with a gallery and online store.',
    link:  'https://github.com/locturui/artpolly-vue',
    image: '/img/artpolly.png',
    stack: ['Vue', 'Nuxt', 'Pinia', 'Tailwind CSS'],
  },
  {
    title: 'ExcursionCRM - work in progress',
    desc:  'CRM for excursion scheduling and management in Innopolis city.',
    image: 'https://placehold.co/400x250?text=CRM',
    stack: ['Vue', 'Nuxt', 'Pinia', 'Tailwind CSS', 'daisyUI'],
  },
]
</script>
