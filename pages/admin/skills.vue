<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-4xl font-bold mb-2">Skills</h1>
        <p class="text-base-content/60">Drag and drop to reorder skills within each category</p>
      </div>
      <button @click="showAddForm = true" class="btn btn-primary">
        + Add Skill
      </button>
    </div>

    <div v-if="pending" class="flex justify-center py-20">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <div v-else-if="error" class="text-center py-10">
      <p class="text-error mb-4">Failed to load skills</p>
      <button @click="refresh()" class="custom-btn custom-btn-primary">Try Again</button>
    </div>

    <div v-else class="space-y-12">
      <div>
        <h3 class="text-2xl font-bold mb-6 flex items-center gap-3">
          <div class="w-1 h-8 bg-gradient-to-b from-primary to-primary/30 rounded-full"></div>
          Frontend & Design
          <span class="text-sm font-normal text-base-content/60 ml-2">
            ({{ groupedSkills.frontend.length }} skills)
          </span>
        </h3>
        <div 
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          @drop="handleDrop($event, 'frontend')"
          @dragover.prevent
          @dragenter.prevent
        >
          <div
            v-for="(skill, index) in groupedSkills.frontend"
            :key="skill.id"
            :draggable="true"
            @dragstart="handleDragStart($event, skill, 'frontend', index)"
            @dragend="handleDragEnd"
            @dragover="handleDragOver($event, 'frontend', index)"
            @dragleave="dragState.dragOver = false"
            :class="[
              'group flex flex-col items-center gap-3 p-6 bg-base-100 rounded-2xl border-2 cursor-move transition-all',
              dragState.dragging && dragState.skillId === skill.id
                ? 'opacity-50 border-primary'
                : 'border-primary/20 hover:border-primary hover:shadow-xl',
              dragState.dragOver && dragState.targetCategory === 'frontend' && dragState.targetIndex === index
                ? 'border-dashed border-primary border-4'
                : ''
            ]"
          >
            <div class="w-16 h-16 flex items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary transition-all relative">
              <Icon :name="skill.icon" class="w-10 h-10 text-primary group-hover:text-primary-content transition-colors" />
              <div class="absolute -top-2 -right-2 w-5 h-5 bg-base-300 rounded-full flex items-center justify-center text-xs">
                {{ index + 1 }}
              </div>
            </div>
            <div class="flex items-center gap-2 w-full justify-center">
              <span class="text-sm font-semibold text-center group-hover:text-primary transition-colors">{{ skill.name }}</span>
              <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  @click.stop="editSkill(skill)" 
                  class="btn btn-xs btn-ghost"
                  title="Edit"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <button 
                  @click.stop="deleteSkill(skill.id)" 
                  class="btn btn-xs btn-ghost text-error"
                  title="Delete"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 class="text-2xl font-bold mb-6 flex items-center gap-3">
          <div class="w-1 h-8 bg-gradient-to-b from-secondary to-secondary/30 rounded-full"></div>
          Backend & Database
          <span class="text-sm font-normal text-base-content/60 ml-2">
            ({{ groupedSkills.backend.length }} skills)
          </span>
        </h3>
        <div 
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          @drop="handleDrop($event, 'backend')"
          @dragover.prevent
          @dragenter.prevent
        >
          <div
            v-for="(skill, index) in groupedSkills.backend"
            :key="skill.id"
            :draggable="true"
            @dragstart="handleDragStart($event, skill, 'backend', index)"
            @dragend="handleDragEnd"
            @dragover="handleDragOver($event, 'backend', index)"
            @dragleave="dragState.dragOver = false"
            :class="[
              'group flex flex-col items-center gap-3 p-6 bg-base-100 rounded-2xl border-2 cursor-move transition-all',
              dragState.dragging && dragState.skillId === skill.id
                ? 'opacity-50 border-secondary'
                : 'border-secondary/20 hover:border-secondary hover:shadow-xl',
              dragState.dragOver && dragState.targetCategory === 'backend' && dragState.targetIndex === index
                ? 'border-dashed border-secondary border-4'
                : ''
            ]"
          >
            <div class="w-16 h-16 flex items-center justify-center rounded-xl bg-secondary/10 group-hover:bg-secondary transition-all relative">
              <Icon :name="skill.icon" class="w-10 h-10 text-secondary group-hover:text-secondary-content transition-colors" />
              <div class="absolute -top-2 -right-2 w-5 h-5 bg-base-300 rounded-full flex items-center justify-center text-xs">
                {{ index + 1 }}
              </div>
            </div>
            <div class="flex items-center gap-2 w-full justify-center">
              <span class="text-sm font-semibold text-center group-hover:text-secondary transition-colors">{{ skill.name }}</span>
              <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  @click.stop="editSkill(skill)" 
                  class="btn btn-xs btn-ghost"
                  title="Edit"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <button 
                  @click.stop="deleteSkill(skill.id)" 
                  class="btn btn-xs btn-ghost text-error"
                  title="Delete"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 class="text-2xl font-bold mb-6 flex items-center gap-3">
          <div class="w-1 h-8 bg-gradient-to-b from-accent to-accent/30 rounded-full"></div>
          DevOps & Soft Skills
          <span class="text-sm font-normal text-base-content/60 ml-2">
            ({{ groupedSkills.devops.length }} skills)
          </span>
        </h3>
        <div 
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          @drop="handleDrop($event, 'devops')"
          @dragover.prevent
          @dragenter.prevent
        >
          <div
            v-for="(skill, index) in groupedSkills.devops"
            :key="skill.id"
            :draggable="true"
            @dragstart="handleDragStart($event, skill, 'devops', index)"
            @dragend="handleDragEnd"
            @dragover="handleDragOver($event, 'devops', index)"
            @dragleave="dragState.dragOver = false"
            :class="[
              'group flex flex-col items-center gap-3 p-6 bg-base-100 rounded-2xl border-2 cursor-move transition-all',
              dragState.dragging && dragState.skillId === skill.id
                ? 'opacity-50 border-accent'
                : 'border-accent/20 hover:border-accent hover:shadow-xl',
              dragState.dragOver && dragState.targetCategory === 'devops' && dragState.targetIndex === index
                ? 'border-dashed border-accent border-4'
                : ''
            ]"
          >
            <div class="w-16 h-16 flex items-center justify-center rounded-xl bg-accent/10 group-hover:bg-accent transition-all relative">
              <Icon :name="skill.icon" class="w-10 h-10 text-accent group-hover:text-accent-content transition-colors" />
              <div class="absolute -top-2 -right-2 w-5 h-5 bg-base-300 rounded-full flex items-center justify-center text-xs">
                {{ index + 1 }}
              </div>
            </div>
            <div class="flex items-center gap-2 w-full justify-center">
              <span class="text-sm font-semibold text-center group-hover:text-accent transition-colors">{{ skill.name }}</span>
              <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  @click.stop="editSkill(skill)" 
                  class="btn btn-xs btn-ghost"
                  title="Edit"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <button 
                  @click.stop="deleteSkill(skill.id)" 
                  class="btn btn-xs btn-ghost text-error"
                  title="Delete"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showIconPicker" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]" @click.self="showIconPicker = false">
      <div class="bg-base-100 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-2xl font-bold">Select Icon</h3>
          <button @click="showIconPicker = false" class="text-base-content/50 hover:text-base-content">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <input
          v-model="iconSearchQuery"
          type="text"
          placeholder="Search icons..."
          class="input input-bordered w-full mb-4"
          @input="filterIcons"
        >
        
        <div class="flex-1 overflow-y-auto">
          <div v-if="filteredIcons.length === 0" class="text-center py-10 text-base-content/60">
            No icons found matching "{{ iconSearchQuery }}"
          </div>
          <div v-else class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            <button
              v-for="icon in filteredIcons"
              :key="icon.name"
              @click="selectIcon(icon.name)"
              :class="[
                'flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all hover:border-primary hover:bg-primary/10',
                form.icon === icon.fullName ? 'border-primary bg-primary/20' : 'border-base-300'
              ]"
              :title="icon.name"
            >
              <div class="w-10 h-10 flex items-center justify-center">
                <Icon :name="icon.fullName" class="w-8 h-8" />
              </div>
              <span class="text-xs text-center truncate w-full">{{ icon.displayName }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showAddForm || editingSkill" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-base-100 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">
            {{ editingSkill ? 'Edit Skill' : 'Add Skill' }}
          </h2>
          <button @click="closeForm" class="text-base-content/50 hover:text-base-content">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="saveSkill" class="space-y-4">
          <div>
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input v-model="form.name" type="text" class="input input-bordered w-full" required>
          </div>

          <div>
            <label class="label">
              <span class="label-text">Icon</span>
            </label>
            <div class="flex gap-2">
              <input 
                v-model="form.icon" 
                type="text" 
                class="input input-bordered flex-1" 
                placeholder="skill-icons:name or click Browse"
                required
              >
              <button 
                type="button" 
                @click="showIconPicker = true"
                class="btn btn-outline"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                Browse
              </button>
            </div>
            <div v-if="form.icon" class="mt-2 flex items-center gap-2">
              <span class="text-sm text-base-content/60">Preview:</span>
              <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-base-200">
                <Icon :name="form.icon" class="w-6 h-6" />
              </div>
            </div>
          </div>

          <div>
            <label class="label">
              <span class="label-text">Category</span>
            </label>
            <select v-model="form.category" class="select select-bordered w-full" required>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="devops">DevOps</option>
            </select>
          </div>

          <div class="flex justify-end gap-4 pt-4">
            <button type="button" @click="closeForm" class="custom-btn custom-btn-ghost">
              Cancel
            </button>
            <button type="submit" class="custom-btn custom-btn-primary" :disabled="saving">
              {{ saving ? 'Saving...' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

interface Skill {
  id: number
  name: string
  icon: string
  category: string
  order: number
}

const adminSecret = useState('adminSecret', () => '')
const isAuthenticated = useState('isAuthenticated', () => false)

const { data: skills, pending, error, refresh } = await useFetch<Skill[]>('/api/admin/skills', {
  query: { secret: adminSecret },
  immediate: isAuthenticated.value,
  watch: [isAuthenticated]
})

const showAddForm = ref(false)
const editingSkill = ref<Skill | null>(null)
const saving = ref(false)
const reordering = ref(false)
const showIconPicker = ref(false)
const iconSearchQuery = ref('')

const availableIcons = [
  { name: 'ableton-dark', displayName: 'Ableton (Dark)', fullName: 'skill-icons:ableton-dark' },
  { name: 'ableton-light', displayName: 'Ableton (Light)', fullName: 'skill-icons:ableton-light' },
  { name: 'activitypub-dark', displayName: 'Activitypub (Dark)', fullName: 'skill-icons:activitypub-dark' },
  { name: 'activitypub-light', displayName: 'Activitypub (Light)', fullName: 'skill-icons:activitypub-light' },
  { name: 'actix-dark', displayName: 'Actix (Dark)', fullName: 'skill-icons:actix-dark' },
  { name: 'actix-light', displayName: 'Actix (Light)', fullName: 'skill-icons:actix-light' },
  { name: 'adonis', displayName: 'Adonis', fullName: 'skill-icons:adonis' },
  { name: 'aftereffects', displayName: 'Aftereffects', fullName: 'skill-icons:aftereffects' },
  { name: 'aiscript-dark', displayName: 'Aiscript (Dark)', fullName: 'skill-icons:aiscript-dark' },
  { name: 'aiscript-light', displayName: 'Aiscript (Light)', fullName: 'skill-icons:aiscript-light' },
  { name: 'alpinejs-dark', displayName: 'Alpinejs (Dark)', fullName: 'skill-icons:alpinejs-dark' },
  { name: 'alpinejs-light', displayName: 'Alpinejs (Light)', fullName: 'skill-icons:alpinejs-light' },
  { name: 'anaconda-dark', displayName: 'Anaconda (Dark)', fullName: 'skill-icons:anaconda-dark' },
  { name: 'anaconda-light', displayName: 'Anaconda (Light)', fullName: 'skill-icons:anaconda-light' },
  { name: 'androidstudio-dark', displayName: 'Android Studio (Dark)', fullName: 'skill-icons:androidstudio-dark' },
  { name: 'androidstudio-light', displayName: 'Android Studio (Light)', fullName: 'skill-icons:androidstudio-light' },
  { name: 'angular-dark', displayName: 'Angular (Dark)', fullName: 'skill-icons:angular-dark' },
  { name: 'angular-light', displayName: 'Angular (Light)', fullName: 'skill-icons:angular-light' },
  { name: 'ansible', displayName: 'Ansible', fullName: 'skill-icons:ansible' },
  { name: 'apollo', displayName: 'Apollo', fullName: 'skill-icons:apollo' },
  { name: 'apple-dark', displayName: 'Apple (Dark)', fullName: 'skill-icons:apple-dark' },
  { name: 'apple-light', displayName: 'Apple (Light)', fullName: 'skill-icons:apple-light' },
  { name: 'appwrite', displayName: 'Appwrite', fullName: 'skill-icons:appwrite' },
  { name: 'arch-dark', displayName: 'Arch (Dark)', fullName: 'skill-icons:arch-dark' },
  { name: 'arch-light', displayName: 'Arch (Light)', fullName: 'skill-icons:arch-light' },
  { name: 'arduino', displayName: 'Arduino', fullName: 'skill-icons:arduino' },
  { name: 'astro', displayName: 'Astro', fullName: 'skill-icons:astro' },
  { name: 'atom', displayName: 'Atom', fullName: 'skill-icons:atom' },
  { name: 'audition', displayName: 'Audition', fullName: 'skill-icons:audition' },
  { name: 'autocad-dark', displayName: 'Autocad (Dark)', fullName: 'skill-icons:autocad-dark' },
  { name: 'autocad-light', displayName: 'Autocad (Light)', fullName: 'skill-icons:autocad-light' },
  { name: 'aws-dark', displayName: 'AWS (Dark)', fullName: 'skill-icons:aws-dark' },
  { name: 'aws-light', displayName: 'AWS (Light)', fullName: 'skill-icons:aws-light' },
  { name: 'azul', displayName: 'Azul', fullName: 'skill-icons:azul' },
  { name: 'azure-dark', displayName: 'Azure (Dark)', fullName: 'skill-icons:azure-dark' },
  { name: 'azure-light', displayName: 'Azure (Light)', fullName: 'skill-icons:azure-light' },
  { name: 'babel', displayName: 'Babel', fullName: 'skill-icons:babel' },
  { name: 'bash-dark', displayName: 'Bash (Dark)', fullName: 'skill-icons:bash-dark' },
  { name: 'bash-light', displayName: 'Bash (Light)', fullName: 'skill-icons:bash-light' },
  { name: 'bevy-dark', displayName: 'Bevy (Dark)', fullName: 'skill-icons:bevy-dark' },
  { name: 'bevy-light', displayName: 'Bevy (Light)', fullName: 'skill-icons:bevy-light' },
  { name: 'bitbucket-dark', displayName: 'Bitbucket (Dark)', fullName: 'skill-icons:bitbucket-dark' },
  { name: 'bitbucket-light', displayName: 'Bitbucket (Light)', fullName: 'skill-icons:bitbucket-light' },
  { name: 'blender-dark', displayName: 'Blender (Dark)', fullName: 'skill-icons:blender-dark' },
  { name: 'blender-light', displayName: 'Blender (Light)', fullName: 'skill-icons:blender-light' },
  { name: 'bootstrap', displayName: 'Bootstrap', fullName: 'skill-icons:bootstrap' },
  { name: 'bsd-dark', displayName: 'Bsd (Dark)', fullName: 'skill-icons:bsd-dark' },
  { name: 'bsd-light', displayName: 'Bsd (Light)', fullName: 'skill-icons:bsd-light' },
  { name: 'bun-dark', displayName: 'Bun (Dark)', fullName: 'skill-icons:bun-dark' },
  { name: 'bun-light', displayName: 'Bun (Light)', fullName: 'skill-icons:bun-light' },
  { name: 'c', displayName: 'C', fullName: 'skill-icons:c' },
  { name: 'cassandra-dark', displayName: 'Cassandra (Dark)', fullName: 'skill-icons:cassandra-dark' },
  { name: 'cassandra-light', displayName: 'Cassandra (Light)', fullName: 'skill-icons:cassandra-light' },
  { name: 'clion-dark', displayName: 'CLion (Dark)', fullName: 'skill-icons:clion-dark' },
  { name: 'clion-light', displayName: 'CLion (Light)', fullName: 'skill-icons:clion-light' },
  { name: 'clojure-dark', displayName: 'Clojure (Dark)', fullName: 'skill-icons:clojure-dark' },
  { name: 'clojure-light', displayName: 'Clojure (Light)', fullName: 'skill-icons:clojure-light' },
  { name: 'cloudflare-dark', displayName: 'Cloudflare (Dark)', fullName: 'skill-icons:cloudflare-dark' },
  { name: 'cloudflare-light', displayName: 'Cloudflare (Light)', fullName: 'skill-icons:cloudflare-light' },
  { name: 'cmake-dark', displayName: 'Cmake (Dark)', fullName: 'skill-icons:cmake-dark' },
  { name: 'cmake-light', displayName: 'Cmake (Light)', fullName: 'skill-icons:cmake-light' },
  { name: 'codepen-dark', displayName: 'Codepen (Dark)', fullName: 'skill-icons:codepen-dark' },
  { name: 'codepen-light', displayName: 'Codepen (Light)', fullName: 'skill-icons:codepen-light' },
  { name: 'coffeescript-dark', displayName: 'Coffeescript (Dark)', fullName: 'skill-icons:coffeescript-dark' },
  { name: 'coffeescript-light', displayName: 'Coffeescript (Light)', fullName: 'skill-icons:coffeescript-light' },
  { name: 'cpp', displayName: 'Cpp', fullName: 'skill-icons:cpp' },
  { name: 'crystal-dark', displayName: 'Crystal (Dark)', fullName: 'skill-icons:crystal-dark' },
  { name: 'crystal-light', displayName: 'Crystal (Light)', fullName: 'skill-icons:crystal-light' },
  { name: 'cs', displayName: 'Cs', fullName: 'skill-icons:cs' },
  { name: 'css', displayName: 'CSS3', fullName: 'skill-icons:css' },
  { name: 'cypress-dark', displayName: 'Cypress (Dark)', fullName: 'skill-icons:cypress-dark' },
  { name: 'cypress-light', displayName: 'Cypress (Light)', fullName: 'skill-icons:cypress-light' },
  { name: 'd3-dark', displayName: 'D3 (Dark)', fullName: 'skill-icons:d3-dark' },
  { name: 'd3-light', displayName: 'D3 (Light)', fullName: 'skill-icons:d3-light' },
  { name: 'dart-dark', displayName: 'Dart (Dark)', fullName: 'skill-icons:dart-dark' },
  { name: 'dart-light', displayName: 'Dart (Light)', fullName: 'skill-icons:dart-light' },
  { name: 'debian-dark', displayName: 'Debian (Dark)', fullName: 'skill-icons:debian-dark' },
  { name: 'debian-light', displayName: 'Debian (Light)', fullName: 'skill-icons:debian-light' },
  { name: 'deno-dark', displayName: 'Deno (Dark)', fullName: 'skill-icons:deno-dark' },
  { name: 'deno-light', displayName: 'Deno (Light)', fullName: 'skill-icons:deno-light' },
  { name: 'devto-dark', displayName: 'Devto (Dark)', fullName: 'skill-icons:devto-dark' },
  { name: 'devto-light', displayName: 'Devto (Light)', fullName: 'skill-icons:devto-light' },
  { name: 'discord', displayName: 'Discord', fullName: 'skill-icons:discord' },
  { name: 'discordbots', displayName: 'Discordbots', fullName: 'skill-icons:discordbots' },
  { name: 'discordjs-dark', displayName: 'Discordjs (Dark)', fullName: 'skill-icons:discordjs-dark' },
  { name: 'discordjs-light', displayName: 'Discordjs (Light)', fullName: 'skill-icons:discordjs-light' },
  { name: 'django', displayName: 'Django', fullName: 'skill-icons:django' },
  { name: 'docker', displayName: 'Docker', fullName: 'skill-icons:docker' },
  { name: 'dotnet', displayName: 'Dotnet', fullName: 'skill-icons:dotnet' },
  { name: 'dynamodb-dark', displayName: 'Dynamodb (Dark)', fullName: 'skill-icons:dynamodb-dark' },
  { name: 'dynamodb-light', displayName: 'Dynamodb (Light)', fullName: 'skill-icons:dynamodb-light' },
  { name: 'eclipse-dark', displayName: 'Eclipse (Dark)', fullName: 'skill-icons:eclipse-dark' },
  { name: 'eclipse-light', displayName: 'Eclipse (Light)', fullName: 'skill-icons:eclipse-light' },
  { name: 'elasticsearch-dark', displayName: 'Elasticsearch (Dark)', fullName: 'skill-icons:elasticsearch-dark' },
  { name: 'elasticsearch-light', displayName: 'Elasticsearch (Light)', fullName: 'skill-icons:elasticsearch-light' },
  { name: 'electron', displayName: 'Electron', fullName: 'skill-icons:electron' },
  { name: 'elixir-dark', displayName: 'Elixir (Dark)', fullName: 'skill-icons:elixir-dark' },
  { name: 'elixir-light', displayName: 'Elixir (Light)', fullName: 'skill-icons:elixir-light' },
  { name: 'elysia-dark', displayName: 'Elysia (Dark)', fullName: 'skill-icons:elysia-dark' },
  { name: 'elysia-light', displayName: 'Elysia (Light)', fullName: 'skill-icons:elysia-light' },
  { name: 'emacs', displayName: 'Emacs', fullName: 'skill-icons:emacs' },
  { name: 'ember', displayName: 'Ember', fullName: 'skill-icons:ember' },
  { name: 'emotion-dark', displayName: 'Emotion (Dark)', fullName: 'skill-icons:emotion-dark' },
  { name: 'emotion-light', displayName: 'Emotion (Light)', fullName: 'skill-icons:emotion-light' },
  { name: 'expressjs-dark', displayName: 'Express (Dark)', fullName: 'skill-icons:expressjs-dark' },
  { name: 'expressjs-light', displayName: 'Express (Light)', fullName: 'skill-icons:expressjs-light' },
  { name: 'fastapi', displayName: 'Fastapi', fullName: 'skill-icons:fastapi' },
  { name: 'fediverse-dark', displayName: 'Fediverse (Dark)', fullName: 'skill-icons:fediverse-dark' },
  { name: 'fediverse-light', displayName: 'Fediverse (Light)', fullName: 'skill-icons:fediverse-light' },
  { name: 'figma-dark', displayName: 'Figma (Dark)', fullName: 'skill-icons:figma-dark' },
  { name: 'figma-light', displayName: 'Figma (Light)', fullName: 'skill-icons:figma-light' },
  { name: 'flask-dark', displayName: 'Flask (Dark)', fullName: 'skill-icons:flask-dark' },
  { name: 'flask-light', displayName: 'Flask (Light)', fullName: 'skill-icons:flask-light' },
  { name: 'flutter-dark', displayName: 'Flutter (Dark)', fullName: 'skill-icons:flutter-dark' },
  { name: 'flutter-light', displayName: 'Flutter (Light)', fullName: 'skill-icons:flutter-light' },
  { name: 'forth', displayName: 'Forth', fullName: 'skill-icons:forth' },
  { name: 'fortran', displayName: 'Fortran', fullName: 'skill-icons:fortran' },
  { name: 'gamemakerstudio', displayName: 'Gamemakerstudio', fullName: 'skill-icons:gamemakerstudio' },
  { name: 'gatsby', displayName: 'Gatsby', fullName: 'skill-icons:gatsby' },
  { name: 'gcp-dark', displayName: 'Google Cloud (Dark)', fullName: 'skill-icons:gcp-dark' },
  { name: 'gcp-light', displayName: 'Google Cloud (Light)', fullName: 'skill-icons:gcp-light' },
  { name: 'gherkin-dark', displayName: 'Gherkin (Dark)', fullName: 'skill-icons:gherkin-dark' },
  { name: 'gherkin-light', displayName: 'Gherkin (Light)', fullName: 'skill-icons:gherkin-light' },
  { name: 'git', displayName: 'Git', fullName: 'skill-icons:git' },
  { name: 'github-dark', displayName: 'GitHub (Dark)', fullName: 'skill-icons:github-dark' },
  { name: 'github-light', displayName: 'GitHub (Light)', fullName: 'skill-icons:github-light' },
  { name: 'githubactions-dark', displayName: 'Githubactions (Dark)', fullName: 'skill-icons:githubactions-dark' },
  { name: 'githubactions-light', displayName: 'Githubactions (Light)', fullName: 'skill-icons:githubactions-light' },
  { name: 'gitlab-dark', displayName: 'GitLab (Dark)', fullName: 'skill-icons:gitlab-dark' },
  { name: 'gitlab-light', displayName: 'GitLab (Light)', fullName: 'skill-icons:gitlab-light' },
  { name: 'gmail-dark', displayName: 'Gmail (Dark)', fullName: 'skill-icons:gmail-dark' },
  { name: 'gmail-light', displayName: 'Gmail (Light)', fullName: 'skill-icons:gmail-light' },
  { name: 'godot-dark', displayName: 'Godot (Dark)', fullName: 'skill-icons:godot-dark' },
  { name: 'godot-light', displayName: 'Godot (Light)', fullName: 'skill-icons:godot-light' },
  { name: 'golang', displayName: 'Golang', fullName: 'skill-icons:golang' },
  { name: 'gradle-dark', displayName: 'Gradle (Dark)', fullName: 'skill-icons:gradle-dark' },
  { name: 'gradle-light', displayName: 'Gradle (Light)', fullName: 'skill-icons:gradle-light' },
  { name: 'grafana-dark', displayName: 'Grafana (Dark)', fullName: 'skill-icons:grafana-dark' },
  { name: 'grafana-light', displayName: 'Grafana (Light)', fullName: 'skill-icons:grafana-light' },
  { name: 'graphql-dark', displayName: 'GraphQL (Dark)', fullName: 'skill-icons:graphql-dark' },
  { name: 'graphql-light', displayName: 'GraphQL (Light)', fullName: 'skill-icons:graphql-light' },
  { name: 'gtk-dark', displayName: 'Gtk (Dark)', fullName: 'skill-icons:gtk-dark' },
  { name: 'gtk-light', displayName: 'Gtk (Light)', fullName: 'skill-icons:gtk-light' },
  { name: 'gulp', displayName: 'Gulp', fullName: 'skill-icons:gulp' },
  { name: 'haskell-dark', displayName: 'Haskell (Dark)', fullName: 'skill-icons:haskell-dark' },
  { name: 'haskell-light', displayName: 'Haskell (Light)', fullName: 'skill-icons:haskell-light' },
  { name: 'haxe-dark', displayName: 'Haxe (Dark)', fullName: 'skill-icons:haxe-dark' },
  { name: 'haxe-light', displayName: 'Haxe (Light)', fullName: 'skill-icons:haxe-light' },
  { name: 'haxeflixel-dark', displayName: 'Haxeflixel (Dark)', fullName: 'skill-icons:haxeflixel-dark' },
  { name: 'haxeflixel-light', displayName: 'Haxeflixel (Light)', fullName: 'skill-icons:haxeflixel-light' },
  { name: 'heroku', displayName: 'Heroku', fullName: 'skill-icons:heroku' },
  { name: 'hibernate-dark', displayName: 'Hibernate (Dark)', fullName: 'skill-icons:hibernate-dark' },
  { name: 'hibernate-light', displayName: 'Hibernate (Light)', fullName: 'skill-icons:hibernate-light' },
  { name: 'html', displayName: 'HTML5', fullName: 'skill-icons:html' },
  { name: 'htmx-dark', displayName: 'Htmx (Dark)', fullName: 'skill-icons:htmx-dark' },
  { name: 'htmx-light', displayName: 'Htmx (Light)', fullName: 'skill-icons:htmx-light' },
  { name: 'idea-dark', displayName: 'Idea (Dark)', fullName: 'skill-icons:idea-dark' },
  { name: 'idea-light', displayName: 'Idea (Light)', fullName: 'skill-icons:idea-light' },
  { name: 'illustrator', displayName: 'Illustrator', fullName: 'skill-icons:illustrator' },
  { name: 'instagram', displayName: 'Instagram', fullName: 'skill-icons:instagram' },
  { name: 'ipfs-dark', displayName: 'Ipfs (Dark)', fullName: 'skill-icons:ipfs-dark' },
  { name: 'ipfs-light', displayName: 'Ipfs (Light)', fullName: 'skill-icons:ipfs-light' },
  { name: 'java-dark', displayName: 'Java (Dark)', fullName: 'skill-icons:java-dark' },
  { name: 'java-light', displayName: 'Java (Light)', fullName: 'skill-icons:java-light' },
  { name: 'javascript', displayName: 'Javascript', fullName: 'skill-icons:javascript' },
  { name: 'jenkins-dark', displayName: 'Jenkins (Dark)', fullName: 'skill-icons:jenkins-dark' },
  { name: 'jenkins-light', displayName: 'Jenkins (Light)', fullName: 'skill-icons:jenkins-light' },
  { name: 'jest', displayName: 'Jest', fullName: 'skill-icons:jest' },
  { name: 'jquery', displayName: 'Jquery', fullName: 'skill-icons:jquery' },
  { name: 'julia-dark', displayName: 'Julia (Dark)', fullName: 'skill-icons:julia-dark' },
  { name: 'julia-light', displayName: 'Julia (Light)', fullName: 'skill-icons:julia-light' },
  { name: 'kafka', displayName: 'Kafka', fullName: 'skill-icons:kafka' },
  { name: 'kali-dark', displayName: 'Kali (Dark)', fullName: 'skill-icons:kali-dark' },
  { name: 'kali-light', displayName: 'Kali (Light)', fullName: 'skill-icons:kali-light' },
  { name: 'kotlin-dark', displayName: 'Kotlin (Dark)', fullName: 'skill-icons:kotlin-dark' },
  { name: 'kotlin-light', displayName: 'Kotlin (Light)', fullName: 'skill-icons:kotlin-light' },
  { name: 'ktor-dark', displayName: 'Ktor (Dark)', fullName: 'skill-icons:ktor-dark' },
  { name: 'ktor-light', displayName: 'Ktor (Light)', fullName: 'skill-icons:ktor-light' },
  { name: 'kubernetes', displayName: 'Kubernetes', fullName: 'skill-icons:kubernetes' },
  { name: 'laravel-dark', displayName: 'Laravel (Dark)', fullName: 'skill-icons:laravel-dark' },
  { name: 'laravel-light', displayName: 'Laravel (Light)', fullName: 'skill-icons:laravel-light' },
  { name: 'latex-dark', displayName: 'Latex (Dark)', fullName: 'skill-icons:latex-dark' },
  { name: 'latex-light', displayName: 'Latex (Light)', fullName: 'skill-icons:latex-light' },
  { name: 'less-dark', displayName: 'Less (Dark)', fullName: 'skill-icons:less-dark' },
  { name: 'less-light', displayName: 'Less (Light)', fullName: 'skill-icons:less-light' },
  { name: 'linkedin', displayName: 'Linkedin', fullName: 'skill-icons:linkedin' },
  { name: 'linux-dark', displayName: 'Linux (Dark)', fullName: 'skill-icons:linux-dark' },
  { name: 'linux-light', displayName: 'Linux (Light)', fullName: 'skill-icons:linux-light' },
  { name: 'lit-dark', displayName: 'Lit (Dark)', fullName: 'skill-icons:lit-dark' },
  { name: 'lit-light', displayName: 'Lit (Light)', fullName: 'skill-icons:lit-light' },
  { name: 'lua-dark', displayName: 'Lua (Dark)', fullName: 'skill-icons:lua-dark' },
  { name: 'lua-light', displayName: 'Lua (Light)', fullName: 'skill-icons:lua-light' },
  { name: 'markdown-dark', displayName: 'Markdown (Dark)', fullName: 'skill-icons:markdown-dark' },
  { name: 'markdown-light', displayName: 'Markdown (Light)', fullName: 'skill-icons:markdown-light' },
  { name: 'mastodon-dark', displayName: 'Mastodon (Dark)', fullName: 'skill-icons:mastodon-dark' },
  { name: 'mastodon-light', displayName: 'Mastodon (Light)', fullName: 'skill-icons:mastodon-light' },
  { name: 'materialui-dark', displayName: 'Materialui (Dark)', fullName: 'skill-icons:materialui-dark' },
  { name: 'materialui-light', displayName: 'Materialui (Light)', fullName: 'skill-icons:materialui-light' },
  { name: 'matlab-dark', displayName: 'Matlab (Dark)', fullName: 'skill-icons:matlab-dark' },
  { name: 'matlab-light', displayName: 'Matlab (Light)', fullName: 'skill-icons:matlab-light' },
  { name: 'maven-dark', displayName: 'Maven (Dark)', fullName: 'skill-icons:maven-dark' },
  { name: 'maven-light', displayName: 'Maven (Light)', fullName: 'skill-icons:maven-light' },
  { name: 'mint-dark', displayName: 'Mint (Dark)', fullName: 'skill-icons:mint-dark' },
  { name: 'mint-light', displayName: 'Mint (Light)', fullName: 'skill-icons:mint-light' },
  { name: 'misskey-dark', displayName: 'Misskey (Dark)', fullName: 'skill-icons:misskey-dark' },
  { name: 'misskey-light', displayName: 'Misskey (Light)', fullName: 'skill-icons:misskey-light' },
  { name: 'mongodb', displayName: 'MongoDB', fullName: 'skill-icons:mongodb' },
  { name: 'mysql-dark', displayName: 'MySQL (Dark)', fullName: 'skill-icons:mysql-dark' },
  { name: 'mysql-light', displayName: 'MySQL (Light)', fullName: 'skill-icons:mysql-light' },
  { name: 'neovim-dark', displayName: 'Neovim (Dark)', fullName: 'skill-icons:neovim-dark' },
  { name: 'neovim-light', displayName: 'Neovim (Light)', fullName: 'skill-icons:neovim-light' },
  { name: 'nestjs-dark', displayName: 'Nestjs (Dark)', fullName: 'skill-icons:nestjs-dark' },
  { name: 'nestjs-light', displayName: 'Nestjs (Light)', fullName: 'skill-icons:nestjs-light' },
  { name: 'netlify-dark', displayName: 'Netlify (Dark)', fullName: 'skill-icons:netlify-dark' },
  { name: 'netlify-light', displayName: 'Netlify (Light)', fullName: 'skill-icons:netlify-light' },
  { name: 'nextjs-dark', displayName: 'Next.js (Dark)', fullName: 'skill-icons:nextjs-dark' },
  { name: 'nextjs-light', displayName: 'Next.js (Light)', fullName: 'skill-icons:nextjs-light' },
  { name: 'nginx', displayName: 'Nginx', fullName: 'skill-icons:nginx' },
  { name: 'nim-dark', displayName: 'Nim (Dark)', fullName: 'skill-icons:nim-dark' },
  { name: 'nim-light', displayName: 'Nim (Light)', fullName: 'skill-icons:nim-light' },
  { name: 'nix-dark', displayName: 'Nix (Dark)', fullName: 'skill-icons:nix-dark' },
  { name: 'nix-light', displayName: 'Nix (Light)', fullName: 'skill-icons:nix-light' },
  { name: 'nodejs-dark', displayName: 'Node.js (Dark)', fullName: 'skill-icons:nodejs-dark' },
  { name: 'nodejs-light', displayName: 'Node.js (Light)', fullName: 'skill-icons:nodejs-light' },
  { name: 'notion-dark', displayName: 'Notion (Dark)', fullName: 'skill-icons:notion-dark' },
  { name: 'notion-light', displayName: 'Notion (Light)', fullName: 'skill-icons:notion-light' },
  { name: 'npm-dark', displayName: 'Npm (Dark)', fullName: 'skill-icons:npm-dark' },
  { name: 'npm-light', displayName: 'Npm (Light)', fullName: 'skill-icons:npm-light' },
  { name: 'nuxtjs-dark', displayName: 'Nuxt (Dark)', fullName: 'skill-icons:nuxtjs-dark' },
  { name: 'nuxtjs-light', displayName: 'Nuxt (Light)', fullName: 'skill-icons:nuxtjs-light' },
  { name: 'obsidian-dark', displayName: 'Obsidian (Dark)', fullName: 'skill-icons:obsidian-dark' },
  { name: 'obsidian-light', displayName: 'Obsidian (Light)', fullName: 'skill-icons:obsidian-light' },
  { name: 'ocaml', displayName: 'Ocaml', fullName: 'skill-icons:ocaml' },
  { name: 'octave-dark', displayName: 'Octave (Dark)', fullName: 'skill-icons:octave-dark' },
  { name: 'octave-light', displayName: 'Octave (Light)', fullName: 'skill-icons:octave-light' },
  { name: 'opencv-dark', displayName: 'Opencv (Dark)', fullName: 'skill-icons:opencv-dark' },
  { name: 'opencv-light', displayName: 'Opencv (Light)', fullName: 'skill-icons:opencv-light' },
  { name: 'openshift', displayName: 'Openshift', fullName: 'skill-icons:openshift' },
  { name: 'openstack-dark', displayName: 'Openstack (Dark)', fullName: 'skill-icons:openstack-dark' },
  { name: 'openstack-light', displayName: 'Openstack (Light)', fullName: 'skill-icons:openstack-light' },
  { name: 'p5js', displayName: 'P5js', fullName: 'skill-icons:p5js' },
  { name: 'perl', displayName: 'Perl', fullName: 'skill-icons:perl' },
  { name: 'photoshop', displayName: 'Photoshop', fullName: 'skill-icons:photoshop' },
  { name: 'php-dark', displayName: 'Php (Dark)', fullName: 'skill-icons:php-dark' },
  { name: 'php-light', displayName: 'Php (Light)', fullName: 'skill-icons:php-light' },
  { name: 'phpstorm-dark', displayName: 'PhpStorm (Dark)', fullName: 'skill-icons:phpstorm-dark' },
  { name: 'phpstorm-light', displayName: 'PhpStorm (Light)', fullName: 'skill-icons:phpstorm-light' },
  { name: 'pinia-dark', displayName: 'Pinia (Dark)', fullName: 'skill-icons:pinia-dark' },
  { name: 'pinia-light', displayName: 'Pinia (Light)', fullName: 'skill-icons:pinia-light' },
  { name: 'pkl-dark', displayName: 'Pkl (Dark)', fullName: 'skill-icons:pkl-dark' },
  { name: 'pkl-light', displayName: 'Pkl (Light)', fullName: 'skill-icons:pkl-light' },
  { name: 'plan9-dark', displayName: 'Plan9 (Dark)', fullName: 'skill-icons:plan9-dark' },
  { name: 'plan9-light', displayName: 'Plan9 (Light)', fullName: 'skill-icons:plan9-light' },
  { name: 'planetscale-dark', displayName: 'Planetscale (Dark)', fullName: 'skill-icons:planetscale-dark' },
  { name: 'planetscale-light', displayName: 'Planetscale (Light)', fullName: 'skill-icons:planetscale-light' },
  { name: 'pnpm-dark', displayName: 'Pnpm (Dark)', fullName: 'skill-icons:pnpm-dark' },
  { name: 'pnpm-light', displayName: 'Pnpm (Light)', fullName: 'skill-icons:pnpm-light' },
  { name: 'postgresql-dark', displayName: 'PostgreSQL (Dark)', fullName: 'skill-icons:postgresql-dark' },
  { name: 'postgresql-light', displayName: 'PostgreSQL (Light)', fullName: 'skill-icons:postgresql-light' },
  { name: 'postman', displayName: 'Postman', fullName: 'skill-icons:postman' },
  { name: 'powershell-dark', displayName: 'Powershell (Dark)', fullName: 'skill-icons:powershell-dark' },
  { name: 'powershell-light', displayName: 'Powershell (Light)', fullName: 'skill-icons:powershell-light' },
  { name: 'premiere', displayName: 'Premiere', fullName: 'skill-icons:premiere' },
  { name: 'prisma', displayName: 'Prisma', fullName: 'skill-icons:prisma' },
  { name: 'processing-dark', displayName: 'Processing (Dark)', fullName: 'skill-icons:processing-dark' },
  { name: 'processing-light', displayName: 'Processing (Light)', fullName: 'skill-icons:processing-light' },
  { name: 'prometheus', displayName: 'Prometheus', fullName: 'skill-icons:prometheus' },
  { name: 'pug-dark', displayName: 'Pug (Dark)', fullName: 'skill-icons:pug-dark' },
  { name: 'pug-light', displayName: 'Pug (Light)', fullName: 'skill-icons:pug-light' },
  { name: 'pycharm-dark', displayName: 'PyCharm (Dark)', fullName: 'skill-icons:pycharm-dark' },
  { name: 'pycharm-light', displayName: 'PyCharm (Light)', fullName: 'skill-icons:pycharm-light' },
  { name: 'python-dark', displayName: 'Python (Dark)', fullName: 'skill-icons:python-dark' },
  { name: 'python-light', displayName: 'Python (Light)', fullName: 'skill-icons:python-light' },
  { name: 'pytorch-dark', displayName: 'Pytorch (Dark)', fullName: 'skill-icons:pytorch-dark' },
  { name: 'pytorch-light', displayName: 'Pytorch (Light)', fullName: 'skill-icons:pytorch-light' },
  { name: 'qt-dark', displayName: 'Qt (Dark)', fullName: 'skill-icons:qt-dark' },
  { name: 'qt-light', displayName: 'Qt (Light)', fullName: 'skill-icons:qt-light' },
  { name: 'r-dark', displayName: 'R (Dark)', fullName: 'skill-icons:r-dark' },
  { name: 'r-light', displayName: 'R (Light)', fullName: 'skill-icons:r-light' },
  { name: 'rabbitmq-dark', displayName: 'Rabbitmq (Dark)', fullName: 'skill-icons:rabbitmq-dark' },
  { name: 'rabbitmq-light', displayName: 'Rabbitmq (Light)', fullName: 'skill-icons:rabbitmq-light' },
  { name: 'rails', displayName: 'Rails', fullName: 'skill-icons:rails' },
  { name: 'raspberrypi-dark', displayName: 'Raspberrypi (Dark)', fullName: 'skill-icons:raspberrypi-dark' },
  { name: 'raspberrypi-light', displayName: 'Raspberrypi (Light)', fullName: 'skill-icons:raspberrypi-light' },
  { name: 'react-dark', displayName: 'React (Dark)', fullName: 'skill-icons:react-dark' },
  { name: 'react-light', displayName: 'React (Light)', fullName: 'skill-icons:react-light' },
  { name: 'reactivex-dark', displayName: 'Reactivex (Dark)', fullName: 'skill-icons:reactivex-dark' },
  { name: 'reactivex-light', displayName: 'Reactivex (Light)', fullName: 'skill-icons:reactivex-light' },
  { name: 'redhat-dark', displayName: 'Redhat (Dark)', fullName: 'skill-icons:redhat-dark' },
  { name: 'redhat-light', displayName: 'Redhat (Light)', fullName: 'skill-icons:redhat-light' },
  { name: 'redis-dark', displayName: 'Redis (Dark)', fullName: 'skill-icons:redis-dark' },
  { name: 'redis-light', displayName: 'Redis (Light)', fullName: 'skill-icons:redis-light' },
  { name: 'redux', displayName: 'Redux', fullName: 'skill-icons:redux' },
  { name: 'regex-dark', displayName: 'Regex (Dark)', fullName: 'skill-icons:regex-dark' },
  { name: 'regex-light', displayName: 'Regex (Light)', fullName: 'skill-icons:regex-light' },
  { name: 'remix-dark', displayName: 'Remix (Dark)', fullName: 'skill-icons:remix-dark' },
  { name: 'remix-light', displayName: 'Remix (Light)', fullName: 'skill-icons:remix-light' },
  { name: 'replit-dark', displayName: 'Replit (Dark)', fullName: 'skill-icons:replit-dark' },
  { name: 'replit-light', displayName: 'Replit (Light)', fullName: 'skill-icons:replit-light' },
  { name: 'rider-dark', displayName: 'Rider (Dark)', fullName: 'skill-icons:rider-dark' },
  { name: 'rider-light', displayName: 'Rider (Light)', fullName: 'skill-icons:rider-light' },
  { name: 'robloxstudio', displayName: 'Robloxstudio', fullName: 'skill-icons:robloxstudio' },
  { name: 'rocket', displayName: 'Rocket', fullName: 'skill-icons:rocket' },
  { name: 'rollupjs-dark', displayName: 'Rollup (Dark)', fullName: 'skill-icons:rollupjs-dark' },
  { name: 'rollupjs-light', displayName: 'Rollup (Light)', fullName: 'skill-icons:rollupjs-light' },
  { name: 'ros-dark', displayName: 'Ros (Dark)', fullName: 'skill-icons:ros-dark' },
  { name: 'ros-light', displayName: 'Ros (Light)', fullName: 'skill-icons:ros-light' },
  { name: 'ruby', displayName: 'Ruby', fullName: 'skill-icons:ruby' },
  { name: 'rust', displayName: 'Rust', fullName: 'skill-icons:rust' },
  { name: 'sass', displayName: 'Sass', fullName: 'skill-icons:sass' },
  { name: 'scala-dark', displayName: 'Scala (Dark)', fullName: 'skill-icons:scala-dark' },
  { name: 'scala-light', displayName: 'Scala (Light)', fullName: 'skill-icons:scala-light' },
  { name: 'scikitlearn-dark', displayName: 'Scikitlearn (Dark)', fullName: 'skill-icons:scikitlearn-dark' },
  { name: 'scikitlearn-light', displayName: 'Scikitlearn (Light)', fullName: 'skill-icons:scikitlearn-light' },
  { name: 'selenium', displayName: 'Selenium', fullName: 'skill-icons:selenium' },
  { name: 'sentry', displayName: 'Sentry', fullName: 'skill-icons:sentry' },
  { name: 'sequelize-dark', displayName: 'Sequelize (Dark)', fullName: 'skill-icons:sequelize-dark' },
  { name: 'sequelize-light', displayName: 'Sequelize (Light)', fullName: 'skill-icons:sequelize-light' },
  { name: 'sketchup-dark', displayName: 'Sketchup (Dark)', fullName: 'skill-icons:sketchup-dark' },
  { name: 'sketchup-light', displayName: 'Sketchup (Light)', fullName: 'skill-icons:sketchup-light' },
  { name: 'solidity', displayName: 'Solidity', fullName: 'skill-icons:solidity' },
  { name: 'solidjs-dark', displayName: 'Solidjs (Dark)', fullName: 'skill-icons:solidjs-dark' },
  { name: 'solidjs-light', displayName: 'Solidjs (Light)', fullName: 'skill-icons:solidjs-light' },
  { name: 'spring-dark', displayName: 'Spring (Dark)', fullName: 'skill-icons:spring-dark' },
  { name: 'spring-light', displayName: 'Spring (Light)', fullName: 'skill-icons:spring-light' },
  { name: 'sqlite', displayName: 'Sqlite', fullName: 'skill-icons:sqlite' },
  { name: 'stackoverflow-dark', displayName: 'Stackoverflow (Dark)', fullName: 'skill-icons:stackoverflow-dark' },
  { name: 'stackoverflow-light', displayName: 'Stackoverflow (Light)', fullName: 'skill-icons:stackoverflow-light' },
  { name: 'styledcomponents', displayName: 'Styledcomponents', fullName: 'skill-icons:styledcomponents' },
  { name: 'sublime-dark', displayName: 'Sublime (Dark)', fullName: 'skill-icons:sublime-dark' },
  { name: 'sublime-light', displayName: 'Sublime (Light)', fullName: 'skill-icons:sublime-light' },
  { name: 'supabase-dark', displayName: 'Supabase (Dark)', fullName: 'skill-icons:supabase-dark' },
  { name: 'supabase-light', displayName: 'Supabase (Light)', fullName: 'skill-icons:supabase-light' },
  { name: 'svelte', displayName: 'Svelte', fullName: 'skill-icons:svelte' },
  { name: 'svg-dark', displayName: 'Svg (Dark)', fullName: 'skill-icons:svg-dark' },
  { name: 'svg-light', displayName: 'Svg (Light)', fullName: 'skill-icons:svg-light' },
  { name: 'swift', displayName: 'Swift', fullName: 'skill-icons:swift' },
  { name: 'symfony-dark', displayName: 'Symfony (Dark)', fullName: 'skill-icons:symfony-dark' },
  { name: 'symfony-light', displayName: 'Symfony (Light)', fullName: 'skill-icons:symfony-light' },
  { name: 'tailwindcss-dark', displayName: 'Tailwind CSS (Dark)', fullName: 'skill-icons:tailwindcss-dark' },
  { name: 'tailwindcss-light', displayName: 'Tailwind CSS (Light)', fullName: 'skill-icons:tailwindcss-light' },
  { name: 'tauri-dark', displayName: 'Tauri (Dark)', fullName: 'skill-icons:tauri-dark' },
  { name: 'tauri-light', displayName: 'Tauri (Light)', fullName: 'skill-icons:tauri-light' },
  { name: 'tensorflow-dark', displayName: 'Tensorflow (Dark)', fullName: 'skill-icons:tensorflow-dark' },
  { name: 'tensorflow-light', displayName: 'Tensorflow (Light)', fullName: 'skill-icons:tensorflow-light' },
  { name: 'terraform-dark', displayName: 'Terraform (Dark)', fullName: 'skill-icons:terraform-dark' },
  { name: 'terraform-light', displayName: 'Terraform (Light)', fullName: 'skill-icons:terraform-light' },
  { name: 'threejs-dark', displayName: 'Threejs (Dark)', fullName: 'skill-icons:threejs-dark' },
  { name: 'threejs-light', displayName: 'Threejs (Light)', fullName: 'skill-icons:threejs-light' },
  { name: 'twitter', displayName: 'Twitter', fullName: 'skill-icons:twitter' },
  { name: 'typescript', displayName: 'Typescript', fullName: 'skill-icons:typescript' },
  { name: 'ubuntu-dark', displayName: 'Ubuntu (Dark)', fullName: 'skill-icons:ubuntu-dark' },
  { name: 'ubuntu-light', displayName: 'Ubuntu (Light)', fullName: 'skill-icons:ubuntu-light' },
  { name: 'unity-dark', displayName: 'Unity (Dark)', fullName: 'skill-icons:unity-dark' },
  { name: 'unity-light', displayName: 'Unity (Light)', fullName: 'skill-icons:unity-light' },
  { name: 'unrealengine', displayName: 'Unrealengine', fullName: 'skill-icons:unrealengine' },
  { name: 'v-dark', displayName: 'V (Dark)', fullName: 'skill-icons:v-dark' },
  { name: 'v-light', displayName: 'V (Light)', fullName: 'skill-icons:v-light' },
  { name: 'vala', displayName: 'Vala', fullName: 'skill-icons:vala' },
  { name: 'vercel-dark', displayName: 'Vercel (Dark)', fullName: 'skill-icons:vercel-dark' },
  { name: 'vercel-light', displayName: 'Vercel (Light)', fullName: 'skill-icons:vercel-light' },
  { name: 'vim-dark', displayName: 'Vim (Dark)', fullName: 'skill-icons:vim-dark' },
  { name: 'vim-light', displayName: 'Vim (Light)', fullName: 'skill-icons:vim-light' },
  { name: 'visualstudio-dark', displayName: 'Visual Studio (Dark)', fullName: 'skill-icons:visualstudio-dark' },
  { name: 'visualstudio-light', displayName: 'Visual Studio (Light)', fullName: 'skill-icons:visualstudio-light' },
  { name: 'vite-dark', displayName: 'Vite (Dark)', fullName: 'skill-icons:vite-dark' },
  { name: 'vite-light', displayName: 'Vite (Light)', fullName: 'skill-icons:vite-light' },
  { name: 'vitest-dark', displayName: 'Vitest (Dark)', fullName: 'skill-icons:vitest-dark' },
  { name: 'vitest-light', displayName: 'Vitest (Light)', fullName: 'skill-icons:vitest-light' },
  { name: 'vscode-dark', displayName: 'VS Code (Dark)', fullName: 'skill-icons:vscode-dark' },
  { name: 'vscode-light', displayName: 'VS Code (Light)', fullName: 'skill-icons:vscode-light' },
  { name: 'vscodium-dark', displayName: 'VSCodium (Dark)', fullName: 'skill-icons:vscodium-dark' },
  { name: 'vscodium-light', displayName: 'VSCodium (Light)', fullName: 'skill-icons:vscodium-light' },
  { name: 'vuejs-dark', displayName: 'Vue.js (Dark)', fullName: 'skill-icons:vuejs-dark' },
  { name: 'vuejs-light', displayName: 'Vue.js (Light)', fullName: 'skill-icons:vuejs-light' },
  { name: 'vuetify-dark', displayName: 'Vuetify (Dark)', fullName: 'skill-icons:vuetify-dark' },
  { name: 'vuetify-light', displayName: 'Vuetify (Light)', fullName: 'skill-icons:vuetify-light' },
  { name: 'webassembly', displayName: 'Webassembly', fullName: 'skill-icons:webassembly' },
  { name: 'webflow', displayName: 'Webflow', fullName: 'skill-icons:webflow' },
  { name: 'webpack-dark', displayName: 'Webpack (Dark)', fullName: 'skill-icons:webpack-dark' },
  { name: 'webpack-light', displayName: 'Webpack (Light)', fullName: 'skill-icons:webpack-light' },
  { name: 'webstorm-dark', displayName: 'WebStorm (Dark)', fullName: 'skill-icons:webstorm-dark' },
  { name: 'webstorm-light', displayName: 'WebStorm (Light)', fullName: 'skill-icons:webstorm-light' },
  { name: 'windicss-dark', displayName: 'Windicss (Dark)', fullName: 'skill-icons:windicss-dark' },
  { name: 'windicss-light', displayName: 'Windicss (Light)', fullName: 'skill-icons:windicss-light' },
  { name: 'windows-dark', displayName: 'Windows (Dark)', fullName: 'skill-icons:windows-dark' },
  { name: 'windows-light', displayName: 'Windows (Light)', fullName: 'skill-icons:windows-light' },
  { name: 'wordpress', displayName: 'Wordpress', fullName: 'skill-icons:wordpress' },
  { name: 'workers-dark', displayName: 'Workers (Dark)', fullName: 'skill-icons:workers-dark' },
  { name: 'workers-light', displayName: 'Workers (Light)', fullName: 'skill-icons:workers-light' },
  { name: 'xd', displayName: 'Xd', fullName: 'skill-icons:xd' },
  { name: 'yarn-dark', displayName: 'Yarn (Dark)', fullName: 'skill-icons:yarn-dark' },
  { name: 'yarn-light', displayName: 'Yarn (Light)', fullName: 'skill-icons:yarn-light' },
  { name: 'yew-dark', displayName: 'Yew (Dark)', fullName: 'skill-icons:yew-dark' },
  { name: 'yew-light', displayName: 'Yew (Light)', fullName: 'skill-icons:yew-light' },
  { name: 'zig-dark', displayName: 'Zig (Dark)', fullName: 'skill-icons:zig-dark' },
  { name: 'zig-light', displayName: 'Zig (Light)', fullName: 'skill-icons:zig-light' },
]

const filteredIcons = computed(() => {
  if (!iconSearchQuery.value.trim()) {
    return availableIcons
  }
  
  const query = iconSearchQuery.value.toLowerCase().trim()
  return availableIcons.filter(icon => 
    icon.name.toLowerCase().includes(query) ||
    icon.displayName.toLowerCase().includes(query) ||
    icon.fullName.toLowerCase().includes(query)
  )
})

function selectIcon(iconName: string) {
  const icon = availableIcons.find(i => i.name === iconName)
  if (icon) {
    form.value.icon = icon.fullName
    showIconPicker.value = false
    iconSearchQuery.value = ''
  }
}

function filterIcons() {
}

const dragState = ref({
  dragging: false,
  skillId: null as number | null,
  sourceCategory: '' as string,
  sourceIndex: -1,
  targetCategory: '' as string,
  targetIndex: -1,
  dragOver: false
})

const groupedSkills = computed(() => {
  if (!skills.value) {
    return {
      frontend: [],
      backend: [],
      devops: []
    }
  }

  const grouped = {
    frontend: [...skills.value.filter(s => s.category === 'frontend')].sort((a, b) => a.order - b.order),
    backend: [...skills.value.filter(s => s.category === 'backend')].sort((a, b) => a.order - b.order),
    devops: [...skills.value.filter(s => s.category === 'devops')].sort((a, b) => a.order - b.order)
  }

  return grouped
})

function getMaxOrderForCategory(category: string): number {
  const categorySkills = groupedSkills.value[category as keyof typeof groupedSkills.value]
  if (categorySkills.length === 0) return 0
  return Math.max(...categorySkills.map(s => s.order))
}

const form = ref({
  name: '',
  icon: '',
  category: 'frontend'
})

function editSkill(skill: Skill) {
  editingSkill.value = skill
  form.value = {
    name: skill.name,
    icon: skill.icon,
    category: skill.category
  }
}

function closeForm() {
  showAddForm.value = false
  editingSkill.value = null
  form.value = {
    name: '',
    icon: '',
    category: 'frontend'
  }
}

async function saveSkill() {
  saving.value = true
  
  try {
    if (editingSkill.value) {
      await $fetch(`/api/admin/skills/${editingSkill.value.id}`, {
        method: 'PATCH',
        body: {
          ...form.value,
          order: editingSkill.value.order
        },
        headers: {
          'Authorization': `Bearer ${adminSecret.value}`
        }
      })
    } else {
      const maxOrder = getMaxOrderForCategory(form.value.category)
      await $fetch('/api/admin/skills', {
        method: 'POST',
        body: {
          ...form.value,
          order: maxOrder + 1
        },
        headers: {
          'Authorization': `Bearer ${adminSecret.value}`
        }
      })
    }

    await refresh()
    closeForm()
  } catch (error: any) {
    console.error('Error saving skill:', error)
    alert(`Failed to save skill: ${error.message || 'Unknown error'}`)
  } finally {
    saving.value = false
  }
}

async function deleteSkill(id: number) {
  if (!confirm('Are you sure you want to delete this skill?')) return
  
  try {
    await $fetch(`/api/admin/skills/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${adminSecret.value}`
      }
    })
    await refresh()
  } catch (error: any) {
    console.error('Error deleting skill:', error)
    alert(`Failed to delete skill: ${error.message || 'Unknown error'}`)
  }
}

function handleDragStart(event: DragEvent, skill: Skill, category: string, index: number) {
  if (!event.dataTransfer) return
  
  dragState.value = {
    dragging: true,
    skillId: skill.id,
    sourceCategory: category,
    sourceIndex: index,
    targetCategory: category,
    targetIndex: index,
    dragOver: false
  }
  
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', skill.id.toString())
}

function handleDragEnd() {
  dragState.value = {
    dragging: false,
    skillId: null,
    sourceCategory: '',
    sourceIndex: -1,
    targetCategory: '',
    targetIndex: -1,
    dragOver: false
  }
}

async function handleDrop(event: DragEvent, targetCategory: string) {
  event.preventDefault()
  
  if (!dragState.value.dragging || !dragState.value.skillId) return

  const skillId = dragState.value.skillId
  const sourceCategory = dragState.value.sourceCategory
  const sourceIndex = dragState.value.sourceIndex
  
  let targetIndex = dragState.value.targetIndex
  
  if (targetIndex === -1 || dragState.value.targetCategory !== targetCategory) {
    const targetElement = event.target as HTMLElement
    const skillCard = targetElement.closest('[draggable="true"]')
    const gridElement = targetElement.closest('.grid')
    
    if (gridElement) {
      const children = Array.from(gridElement.children) as HTMLElement[]
      const dropY = event.clientY
      
      for (let i = 0; i < children.length; i++) {
        const rect = children[i].getBoundingClientRect()
        if (dropY < rect.top + rect.height / 2) {
          targetIndex = i
          break
        }
      }
      
      if (targetIndex === -1) {
        targetIndex = children.length
      }
    } else if (skillCard) {
      const gridElement = skillCard.parentElement
      if (gridElement) {
        const children = Array.from(gridElement.children) as HTMLElement[]
        targetIndex = children.indexOf(skillCard as HTMLElement)
      }
    } else {
      targetIndex = groupedSkills.value[targetCategory as keyof typeof groupedSkills.value].length
    }
  }

  if (sourceCategory === targetCategory && sourceIndex === targetIndex) {
    handleDragEnd()
    return
  }

  reordering.value = true

  try {
    const targetSkills = [...groupedSkills.value[targetCategory as keyof typeof groupedSkills.value]]
    
    if (sourceCategory !== targetCategory) {
      const sourceSkills = [...groupedSkills.value[sourceCategory as keyof typeof groupedSkills.value]]
      sourceSkills.splice(sourceIndex, 1)
      
      const sourceUpdates = sourceSkills.map((skill, idx) => ({
        id: skill.id,
        order: idx + 1
      }))
      
      if (sourceUpdates.length > 0) {
        await $fetch('/api/admin/skills/reorder', {
          method: 'POST' as any,
          body: { updates: sourceUpdates },
          headers: {
            'Authorization': `Bearer ${adminSecret.value}`
          }
        })
      }
    } else {
      targetSkills.splice(sourceIndex, 1)
    }

    const draggedSkill = skills.value?.find(s => s.id === skillId)
    if (!draggedSkill) return

    if (sourceCategory !== targetCategory) {
      await $fetch(`/api/admin/skills/${skillId}`, {
        method: 'PATCH',
        body: {
          category: targetCategory
        },
        headers: {
          'Authorization': `Bearer ${adminSecret.value}`
        }
      })
    }

    targetSkills.splice(targetIndex, 0, draggedSkill)

    const updates = targetSkills.map((skill, idx) => ({
      id: skill.id,
      order: idx + 1
    }))

    await $fetch('/api/admin/skills/reorder', {
      method: 'POST' as any,
      body: { updates },
      headers: {
        'Authorization': `Bearer ${adminSecret.value}`
      }
    })

    await refresh()
  } catch (error: any) {
    console.error('Error reordering skills:', error)
    alert(`Failed to reorder skills: ${error.message || 'Unknown error'}`)
  } finally {
    reordering.value = false
    handleDragEnd()
  }
}

function handleDragOver(event: DragEvent, category: string, index: number) {
  event.preventDefault()
  dragState.value.targetCategory = category
  dragState.value.targetIndex = index
  dragState.value.dragOver = true
}
</script>
