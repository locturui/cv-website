<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold">Skills</h1>
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

    <div v-else class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="skill in skills" :key="skill.id" 
             class="bg-base-100 rounded-lg shadow-lg p-4 border border-base-300">
          <div class="flex justify-between items-start mb-3">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon :name="skill.icon" class="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 class="font-bold">{{ skill.name }}</h3>
                <p class="text-sm text-base-content/60 capitalize">{{ skill.category }}</p>
              </div>
            </div>
            <div class="flex gap-1">
              <button @click="editSkill(skill)" class="custom-btn custom-btn-secondary text-xs">
                Edit
              </button>
              <button @click="deleteSkill(skill.id)" class="custom-btn custom-btn-ghost text-xs text-error">
                Delete
              </button>
            </div>
          </div>
          <div class="text-xs text-base-content/60">
            <p><strong>Order:</strong> {{ skill.order }}</p>
            <p><strong>Icon:</strong> {{ skill.icon }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
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
              <span class="label-text">Icon (skill-icons:name)</span>
            </label>
            <input v-model="form.icon" type="text" class="input input-bordered w-full" required>
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

const form = ref({
  name: '',
  icon: '',
  category: 'frontend',
  order: 1
})

function editSkill(skill: Skill) {
  editingSkill.value = skill
  form.value = { ...skill }
}

function closeForm() {
  showAddForm.value = false
  editingSkill.value = null
  form.value = {
    name: '',
    icon: '',
    category: 'frontend',
    order: 1
  }
}

async function saveSkill() {
  saving.value = true
  
  try {
    if (editingSkill.value) {
      await $fetch(`/api/admin/skills/${editingSkill.value.id}`, {
        method: 'PATCH',
        body: form.value,
        headers: {
          'Authorization': `Bearer ${adminSecret.value}`
        }
      })
    } else {
      await $fetch('/api/admin/skills', {
        method: 'POST',
        body: form.value,
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
</script>
