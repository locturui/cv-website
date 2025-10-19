<template>
  <div class="min-h-screen bg-base-200 p-4">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-bold">Admin Panel</h1>
        <button @click="showAddModal = true" class="btn btn-primary">
          + Add New Project
        </button>
      </div>

      <div v-if="!isAuthenticated" class="card bg-base-100 p-6 max-w-md mx-auto">
        <h2 class="text-2xl font-bold mb-4">Admin Login</h2>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Admin Secret</span>
          </label>
          <input 
            v-model="adminSecret" 
            type="password" 
            placeholder="Enter admin secret"
            class="input input-bordered"
            @keyup.enter="authenticate"
          />
        </div>
        <button @click="authenticate" class="btn btn-primary mt-4">Login</button>
        <p v-if="authError" class="text-error mt-2">{{ authError }}</p>
      </div>

      <div v-else>
        <div v-if="pending" class="text-center py-10">
          <span class="loading loading-spinner loading-lg"></span>
        </div>

        <div v-else-if="error" class="alert alert-error">
          <span>Failed to load projects: {{ error }}</span>
        </div>

        <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="project in projects" :key="project.id" class="card bg-base-100 shadow-lg">
            <figure class="h-48">
              <img :src="project.image" :alt="project.titleEn" class="w-full h-full object-cover" />
            </figure>
            <div class="card-body">
              <h2 class="card-title">{{ project.titleEn }}</h2>
              <p class="text-sm opacity-70">Key: {{ project.key }}</p>
              <div v-if="Array.isArray((project as any).stack)" class="flex flex-wrap gap-1 mt-2">
                <span v-for="tech in (project as any).stack" :key="tech" class="badge badge-sm">
                  {{ tech }}
                </span>
              </div>
              <div class="card-actions justify-end mt-4">
                <button @click="editProject(project)" class="btn btn-sm btn-info">Edit</button>
                <button @click="deleteProject(project.id)" class="btn btn-sm btn-error">Delete</button>
              </div>
            </div>
          </div>
        </div>

        <dialog :open="showAddModal || editingProject !== null" class="modal">
          <div class="modal-box max-w-4xl">
            <h3 class="font-bold text-2xl mb-4">
              {{ editingProject ? 'Edit Project' : 'Add New Project' }}
            </h3>
            <ProjectForm 
              :project="editingProject" 
              :admin-secret="adminSecret"
              @success="handleFormSuccess"
              @cancel="closeModal"
            />
          </div>
          <form method="dialog" class="modal-backdrop">
            <button @click="closeModal">close</button>
          </form>
        </dialog>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const adminSecret = ref('')
const isAuthenticated = ref(false)
const authError = ref('')
const showAddModal = ref(false)
const editingProject = ref(null)

const { data: projects, pending, error, refresh } = await useFetch('/api/admin/projects', {
  query: { secret: adminSecret },
  immediate: false
})

const authenticate = async () => {
  if (!adminSecret.value) {
    authError.value = 'Please enter admin secret'
    return
  }

  try {
    await refresh()
    isAuthenticated.value = true
    authError.value = ''
  } catch (err: any) {
    authError.value = 'Invalid admin secret'
    isAuthenticated.value = false
  }
}

const editProject = (project: any) => {
  editingProject.value = project
}

const deleteProject = async (id: number) => {
  if (!confirm('Are you sure you want to delete this project?')) return

  try {
    await $fetch(`/api/admin/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${adminSecret.value}`
      }
    })
    await refresh()
  } catch (err: any) {
    alert('Failed to delete project: ' + err.message)
  }
}

const handleFormSuccess = () => {
  closeModal()
  refresh()
}

const closeModal = () => {
  showAddModal.value = false
  editingProject.value = null
}
</script>

