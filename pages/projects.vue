<template>
  <section class="max-w-6xl mx-auto py-16" data-aos="fade-up">
    <h2 class="text-4xl font-bold mb-10 text-center">{{ $t('proj.title') }}</h2>

    <div v-if="pending" class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 pl-2 pr-2 md:pl-0 md:pr-0">
      <div v-for="i in 3" :key="i" class="card bg-base-100 animate-pulse">
        <div class="h-48 bg-base-300"></div>
        <div class="card-body">
          <div class="h-6 bg-base-300 rounded mb-2"></div>
          <div class="h-4 bg-base-300 rounded"></div>
        </div>
      </div>
    </div>

    <div v-else-if="error" class="text-center py-10">
      <p class="text-error mb-4">{{ $t('proj.error') || 'Failed to load projects' }}</p>
      <button @click="refresh()" class="btn btn-primary">{{ $t('proj.retry') || 'Try Again' }}</button>
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

const { data: projects, pending, error, refresh } = await useFetch<Project[]>('/api/projects', {
  query: { locale },
  key: `projects-${locale.value}`
})

const openProjectModal = (project: any) => {
  projectModal.value?.openModal(project)
}
</script>