<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold">Experience</h1>
      <button @click="showAddForm = true" class="btn btn-primary">
        + Add Experience
      </button>
    </div>

    <div v-if="pending" class="flex justify-center py-20">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <div v-else-if="error" class="text-center py-10">
      <p class="text-error mb-4">Failed to load experience</p>
      <button @click="refresh()" class="custom-btn custom-btn-primary">Try Again</button>
    </div>

    <div v-else class="space-y-6">
      <div v-for="exp in experiences" :key="exp.id" 
           class="bg-base-100 rounded-lg shadow-lg p-6 border border-base-300">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-xl font-bold">{{ exp.roleEn }}</h3>
            <p class="text-base-content/70">{{ exp.companyEn }}</p>
            <p class="text-sm text-primary font-medium">{{ exp.year }}</p>
          </div>
          <div class="flex gap-2">
            <button @click="editExperience(exp)" class="custom-btn custom-btn-secondary text-sm">
              Edit
            </button>
            <button @click="deleteExperience(exp.id)" class="custom-btn custom-btn-ghost text-sm text-error">
              Delete
            </button>
          </div>
        </div>
        <div class="text-sm text-base-content/80">
          <p><strong>Key:</strong> {{ exp.key }}</p>
          <p><strong>Tech:</strong> {{ exp.techEn }}</p>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddForm || editingExperience" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-base-100 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">
            {{ editingExperience ? 'Edit Experience' : 'Add Experience' }}
          </h2>
          <button @click="closeForm" class="text-base-content/50 hover:text-base-content">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="saveExperience" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="label">
                <span class="label-text">Key</span>
              </label>
              <input v-model="form.key" type="text" class="input input-bordered w-full" required>
            </div>
            <div>
              <label class="label">
                <span class="label-text">Year</span>
              </label>
              <input v-model="form.year" type="text" class="input input-bordered w-full" required>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="label">
                <span class="label-text">Role (EN)</span>
              </label>
              <input v-model="form.roleEn" type="text" class="input input-bordered w-full" required>
            </div>
            <div>
              <label class="label">
                <span class="label-text">Role (RU)</span>
              </label>
              <input v-model="form.roleRu" type="text" class="input input-bordered w-full" required>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="label">
                <span class="label-text">Company (EN)</span>
              </label>
              <input v-model="form.companyEn" type="text" class="input input-bordered w-full" required>
            </div>
            <div>
              <label class="label">
                <span class="label-text">Company (RU)</span>
              </label>
              <input v-model="form.companyRu" type="text" class="input input-bordered w-full" required>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="label">
                <span class="label-text">Tech (EN)</span>
              </label>
              <input v-model="form.techEn" type="text" class="input input-bordered w-full" required>
            </div>
            <div>
              <label class="label">
                <span class="label-text">Tech (RU)</span>
              </label>
              <input v-model="form.techRu" type="text" class="input input-bordered w-full" required>
            </div>
          </div>

          <div>
            <label class="label">
              <span class="label-text">Bullets (EN) - One per line</span>
            </label>
            <textarea v-model="bulletsEnText" class="textarea textarea-bordered w-full h-24" required></textarea>
          </div>

          <div>
            <label class="label">
              <span class="label-text">Bullets (RU) - One per line</span>
            </label>
            <textarea v-model="bulletsRuText" class="textarea textarea-bordered w-full h-24" required></textarea>
          </div>

          <div>
            <label class="label">
              <span class="label-text">Order</span>
            </label>
            <input v-model.number="form.order" type="number" class="input input-bordered w-full" required>
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

interface Experience {
  id: number
  key: string
  year: string
  roleEn: string
  roleRu: string
  companyEn: string
  companyRu: string
  bulletsEn: string
  bulletsRu: string
  techEn: string
  techRu: string
  order: number
}

const adminSecret = useState('adminSecret', () => '')
const isAuthenticated = useState('isAuthenticated', () => false)

const { data: experiences, pending, error, refresh } = await useFetch<Experience[]>('/api/admin/experience', {
  query: { secret: adminSecret },
  immediate: isAuthenticated.value,
  watch: [isAuthenticated]
})

const showAddForm = ref(false)
const editingExperience = ref<Experience | null>(null)
const saving = ref(false)

const form = ref({
  key: '',
  year: '',
  roleEn: '',
  roleRu: '',
  companyEn: '',
  companyRu: '',
  bulletsEn: '',
  bulletsRu: '',
  techEn: '',
  techRu: '',
  order: 1
})

const bulletsEnText = ref('')
const bulletsRuText = ref('')

function editExperience(exp: Experience) {
  editingExperience.value = exp
  form.value = { ...exp }
  bulletsEnText.value = JSON.parse(exp.bulletsEn).join('\n')
  bulletsRuText.value = JSON.parse(exp.bulletsRu).join('\n')
}

function closeForm() {
  showAddForm.value = false
  editingExperience.value = null
  form.value = {
    key: '',
    year: '',
    roleEn: '',
    roleRu: '',
    companyEn: '',
    companyRu: '',
    bulletsEn: '',
    bulletsRu: '',
    techEn: '',
    techRu: '',
    order: 1
  }
  bulletsEnText.value = ''
  bulletsRuText.value = ''
}

async function saveExperience() {
  saving.value = true
  
  try {
    const payload = {
      ...form.value,
      bulletsEn: JSON.stringify(bulletsEnText.value.split('\n').filter(b => b.trim())),
      bulletsRu: JSON.stringify(bulletsRuText.value.split('\n').filter(b => b.trim()))
    }

    if (editingExperience.value) {
      await $fetch(`/api/admin/experience/${editingExperience.value.id}`, {
        method: 'PATCH',
        body: payload,
        headers: {
          'Authorization': `Bearer ${adminSecret.value}`
        }
      })
    } else {
      await $fetch('/api/admin/experience', {
        method: 'POST',
        body: payload,
        headers: {
          'Authorization': `Bearer ${adminSecret.value}`
        }
      })
    }

    await refresh()
    closeForm()
  } catch (error: any) {
    console.error('Error saving experience:', error)
    alert(`Failed to save experience: ${error.message || 'Unknown error'}`)
  } finally {
    saving.value = false
  }
}

async function deleteExperience(id: number) {
  if (!confirm('Are you sure you want to delete this experience?')) return
  
  try {
    await $fetch(`/api/admin/experience/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${adminSecret.value}`
      }
    })
    await refresh()
  } catch (error: any) {
    console.error('Error deleting experience:', error)
    alert(`Failed to delete experience: ${error.message || 'Unknown error'}`)
  }
}
</script>
