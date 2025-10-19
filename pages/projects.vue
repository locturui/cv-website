<template>
  <section class="max-w-6xl mx-auto py-16" data-aos="fade-up">
    <div class="text-center mb-12">
      <h2 class="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent inline-block">
        {{ $t('proj.title') }}
      </h2>
      <div class="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full"></div>
    </div>

    <div v-if="pending" class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 pl-2 pr-2 md:pl-0 md:pr-0">
      <div v-for="i in 6" :key="i" class="group relative overflow-hidden rounded-2xl bg-base-100 border border-base-300 shadow-lg">
        <div class="relative h-64 bg-gradient-to-br from-base-200 to-base-300 animate-pulse">
          <div class="absolute inset-0 bg-gradient-to-t from-base-300/50 to-transparent"></div>
        </div>
        <div class="p-6 space-y-4">
          <div class="h-7 bg-base-300 rounded-lg w-3/4 animate-pulse"></div>
          <div class="space-y-2">
            <div class="h-4 bg-base-300 rounded w-full animate-pulse"></div>
            <div class="h-4 bg-base-300 rounded w-5/6 animate-pulse"></div>
          </div>
          <div class="flex gap-2 pt-2">
            <div class="h-6 w-16 bg-base-300 rounded-full animate-pulse"></div>
            <div class="h-6 w-20 bg-base-300 rounded-full animate-pulse"></div>
            <div class="h-6 w-14 bg-base-300 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="error" class="text-center py-10">
      <p class="text-error mb-4">{{ $t('proj.error') || 'Failed to load projects' }}</p>
      <button @click="refresh()" class="custom-btn custom-btn-primary">{{ $t('proj.retry') || 'Try Again' }}</button>
    </div>

    <div v-else class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 pl-2 pr-2 md:pl-0 md:pr-0">
      <ProjectCard
        v-for="p in projects"
        :key="p.key"
        :p="p"
        @open-project="openProjectModal"
      />
    </div>

    <ProjectModal ref="projectModal" />
  </section>
</template>

<script setup lang="ts">
interface Project {
  key: string
  title: string
  desc: string
  description: string
  link: string
  githubLink: string
  deployLink: string
  image: string
  images: string[]
  stack: string[]
}

const { locale } = useI18n()
const projectModal = ref()

const { data: projects, pending, error, refresh } = useFetch<Project[]>('/api/projects', {
  query: { locale },
  key: `projects-${locale.value}`
})

const openProjectModal = (project: any) => {
  projectModal.value?.openModal(project)
}
</script>