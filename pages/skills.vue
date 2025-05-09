<template>
  <section class="max-w-5xl mx-auto py-16" data-aos="fade-up">
    <h2 class="text-4xl font-bold mb-8 text-center">Skill Set</h2>

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
  { title: 'Frontend',    items: ['HTML5',
  'CSS3 / SCSS',
  'JS',
  'TS', 'Vue 3', 'Nuxt', 'Vite', 'Tailwind', 'daisyUI', 'Pinia'] },
  { title: 'Backend',   items: ['Go', 'gin', 'Goroutines & Channels', 'net/http', 'gRPC', 'Database/sql & GORM'] },
  { title: 'Dev Ops',     items: ['Docker', 'CI/CD', 'ESLint'] },
  { title: 'Soft Skills', items: ['Agile', 'Public Speaking', 'Proficient English', 'Tech Writing'] },
]
</script>
