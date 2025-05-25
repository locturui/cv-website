<template>
  <section class="max-w-5xl mx-auto py-16" data-aos="fade-up">
    <h2 class="text-4xl font-bold mb-8 text-center">{{ $t('skills.title') }}</h2>

    <div class="grid gap-8 md:grid-cols-2 p-4 lg:p-0">
      <SkillCard
        v-for="group in groups"
        :key="group.title"
        :title="group.title"
        :items="group.items"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const groups = [
  {
    title: 'Frontend',
    items: [
      { name: 'HTML5',        icon: 'tabler:brand-html5' },
      { name: 'CSS3 / SCSS',  icon: 'tabler:brand-css3' },
      { name: 'JavaScript',    icon: 'tabler:brand-javascript' },
      { name: 'TypeScripts',   icon: 'tabler:brand-typescript' },
      { name: 'Vue 3',         icon: 'tabler:brand-vue' },
      { name: 'Nuxt',          icon: 'tabler:brand-nuxt' },
      { name: 'Vite',          icon: 'tabler:brand-vite' },
      { name: 'Tailwind',      icon: 'tabler:brand-tailwind' },
      { name: 'daisyUI' },
      { name: 'Pinia' }
    ]
  },
  {
    title: 'Backend',
    items: [
      { name: 'Go',               icon: 'tabler:brand-golang' },
      { name: 'gin' },
      { name: 'net/http' },
      { name: 'gRPC' },
      { name: 'SQL',     icon: 'tabler:database' }
    ]
  },
  {
    title: 'Dev Ops',
    items: [
      { name: 'Docker',   icon: 'tabler:brand-docker' },
      { name: 'CI/CD',    icon: 'tabler:git-branch' },
      { name: 'ESLint' }
    ]
  },
  {
    title: 'Soft Skills',
    items: [
      { name: 'Agile' },
      { name: 'Public Speaking' },
      { name: 'Proficient English' },
      { name: 'Tech Writing' }
    ]
  }
]
</script>
