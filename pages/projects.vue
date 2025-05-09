<template>
  <section class="max-w-6xl mx-auto py-16" data-aos="fade-up">
    <h2 class="text-4xl font-bold mb-10 text-center">{{ $t('proj.title') }}</h2>

    <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 pl-2 pr-2 md:pl-0 md:pr-0">
      <ProjectCard
        v-for="p in projects"
        :key="p.title"
        :p="p"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const projectKeys = ['alumni', 'artpolly', 'excursion']

const { t, tm } = useI18n()

const projects = computed(() =>
  projectKeys.map(key => {
    const base = `proj.items.${key}`

    const nTags = tm(`${base}.stack`).length

    const stack = Array.from({ length: nTags }, (_, i) =>
      t(`${base}.stack[${i}]`)
    )

    return {
      title:  t(`${base}.title`),
      desc:   t(`${base}.desc`),
      link:   t(`${base}.link`),
      image:  t(`${base}.image`),
      stack
    }
  })
)
</script>