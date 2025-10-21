<template>
  <section class="max-w-6xl mx-auto py-16 px-4">
    <div class="text-center mb-16" data-aos="fade-up">
      <h2 class="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent inline-block mb-4">
        {{ $t('skills.title') }}
      </h2>
      <div class="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
    </div>

    <div v-if="pending" class="space-y-12">
      <div v-for="section in ['frontend', 'backend', 'devops']" :key="section">
        <div class="h-8 w-64 bg-base-300 rounded-lg mb-6 animate-pulse"></div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div v-for="i in 8" :key="i" 
               class="flex flex-col items-center gap-3 p-6 bg-base-100 rounded-2xl border-2 border-base-300">
            <div class="w-16 h-16 bg-base-300 rounded-xl animate-pulse"></div>
            <div class="h-4 w-20 bg-base-300 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="error" class="text-center py-10">
      <p class="text-error mb-4">Failed to load skills</p>
      <button @click="refresh()" class="custom-btn custom-btn-primary">Try Again</button>
    </div>

    <div v-else class="space-y-12">
      <div data-aos="fade-up">
        <h3 class="text-2xl font-bold mb-6 flex items-center gap-3">
          <div class="w-1 h-8 bg-gradient-to-b from-primary to-primary/30 rounded-full"></div>
          Frontend & Design
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div v-for="skill in skills?.frontend" :key="skill.name" 
               class="group flex flex-col items-center gap-3 p-6 bg-base-100 rounded-2xl border-2 border-primary/20 hover:border-primary hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div class="w-16 h-16 flex items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary group-hover:scale-110 transition-all">
              <Icon v-if="skill.icon" :name="skill.icon" class="w-10 h-10 text-primary group-hover:text-primary-content transition-colors" />
              <Code2 v-else class="w-10 h-10 text-primary group-hover:text-primary-content transition-colors" />
            </div>
            <span class="text-sm font-semibold text-center group-hover:text-primary transition-colors">{{ skill.name }}</span>
          </div>
        </div>
      </div>

      <div data-aos="fade-up" data-aos-delay="100">
        <h3 class="text-2xl font-bold mb-6 flex items-center gap-3">
          <div class="w-1 h-8 bg-gradient-to-b from-secondary to-secondary/30 rounded-full"></div>
          Backend & Database
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div v-for="skill in skills?.backend" :key="skill.name" 
               class="group flex flex-col items-center gap-3 p-6 bg-base-100 rounded-2xl border-2 border-secondary/20 hover:border-secondary hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div class="w-16 h-16 flex items-center justify-center rounded-xl bg-secondary/10 group-hover:bg-secondary group-hover:scale-110 transition-all">
              <Icon v-if="skill.icon" :name="skill.icon" class="w-10 h-10 text-secondary group-hover:text-secondary-content transition-colors" />
              <Database v-else class="w-10 h-10 text-secondary group-hover:text-secondary-content transition-colors" />
            </div>
            <span class="text-sm font-semibold text-center group-hover:text-secondary transition-colors">{{ skill.name }}</span>
          </div>
        </div>
      </div>

      <div data-aos="fade-up" data-aos-delay="200">
        <h3 class="text-2xl font-bold mb-6 flex items-center gap-3">
          <div class="w-1 h-8 bg-gradient-to-b from-accent to-accent/30 rounded-full"></div>
          DevOps & Soft Skills
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div v-for="skill in skills?.devops" :key="skill.name" 
               class="group flex flex-col items-center gap-3 p-6 bg-base-100 rounded-2xl border-2 border-accent/20 hover:border-accent hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div class="w-16 h-16 flex items-center justify-center rounded-xl bg-accent/10 group-hover:bg-accent group-hover:scale-110 transition-all">
              <Icon v-if="skill.icon" :name="skill.icon" class="w-10 h-10 text-accent group-hover:text-accent-content transition-colors" />
              <Sparkles v-else class="w-10 h-10 text-accent group-hover:text-accent-content transition-colors" />
            </div>
            <span class="text-sm font-semibold text-center group-hover:text-accent transition-colors">{{ skill.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Code2, Database, Sparkles } from 'lucide-vue-next'

interface Skill {
  id: number
  name: string
  icon: string
  category: string
  order: number
}

interface SkillsData {
  frontend: Skill[]
  backend: Skill[]
  devops: Skill[]
}

const { data: skills, pending, error, refresh } = useFetch<SkillsData>('/api/skills')
</script>


