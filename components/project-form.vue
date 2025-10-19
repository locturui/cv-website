<template>
  <form @submit.prevent="handleSubmit" class="space-y-6 max-h-[70vh] overflow-y-auto pr-4">
    <div class="card bg-base-200 p-4">
      <h4 class="font-bold text-lg mb-4 flex items-center gap-2">
        <span class="badge badge-primary">1</span> Basic Information
      </h4>
      <div class="space-y-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Key</span>
            <span class="label-text-alt text-xs">Unique identifier (e.g., my-project)</span>
          </label>
          <input 
            v-model="form.key" 
            type="text" 
            required 
            class="input input-bordered focus:input-primary" 
            placeholder="my-project" 
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Project Link</span>
            <span class="label-text-alt text-xs">Optional GitHub/demo URL</span>
          </label>
          <input 
            v-model="form.link" 
            type="url" 
            class="input input-bordered focus:input-primary" 
            placeholder="https://github.com/username/project" 
          />
        </div>
      </div>
    </div>

    <div class="card bg-base-200 p-4">
      <h4 class="font-bold text-lg mb-4 flex items-center gap-2">
        <span class="badge badge-primary">2</span> English Content
      </h4>
      <div class="space-y-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Title</span>
            <span class="label-text-alt text-error">*</span>
          </label>
          <input 
            v-model="form.titleEn" 
            type="text" 
            required 
            class="input input-bordered focus:input-primary" 
            placeholder="My Awesome Project"
          />
        </div>
        
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Short Description</span>
            <span class="label-text-alt text-xs">Card preview text</span>
          </label>
          <input 
            v-model="form.descEn" 
            type="text" 
            class="input input-bordered focus:input-primary" 
            placeholder="A brief one-line description"
          />
        </div>
        
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Full Description</span>
            <span class="label-text-alt text-xs">Modal description (supports line breaks)</span>
          </label>
          <textarea 
            v-model="form.descriptionEn" 
            class="textarea textarea-bordered focus:textarea-primary h-40" 
            placeholder="Full project description with details, features, etc."
          ></textarea>
        </div>
      </div>
    </div>

    <div class="card bg-base-200 p-4">
      <h4 class="font-bold text-lg mb-4 flex items-center gap-2">
        <span class="badge badge-primary">3</span> Russian Content
      </h4>
      <div class="space-y-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Название</span>
            <span class="label-text-alt text-error">*</span>
          </label>
          <input 
            v-model="form.titleRu" 
            type="text" 
            required 
            class="input input-bordered focus:input-primary" 
            placeholder="Мой Прекрасный Проект"
          />
        </div>
        
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Краткое описание</span>
            <span class="label-text-alt text-xs">Текст превью карточки</span>
          </label>
          <input 
            v-model="form.descRu" 
            type="text" 
            class="input input-bordered focus:input-primary" 
            placeholder="Краткое описание в одну строку"
          />
        </div>
        
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Полное описание</span>
            <span class="label-text-alt text-xs">Описание в модальном окне</span>
          </label>
          <textarea 
            v-model="form.descriptionRu" 
            class="textarea textarea-bordered focus:textarea-primary h-40" 
            placeholder="Полное описание проекта с деталями, функциями и т.д."
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Images -->
    <div class="card bg-base-200 p-4">
      <h4 class="font-bold text-lg mb-4 flex items-center gap-2">
        <span class="badge badge-primary">4</span> Images
      </h4>
      <div class="space-y-6">
        <!-- Main Image -->
        <div>
          <label class="label">
            <span class="label-text font-semibold">Main Image</span>
            <span class="label-text-alt text-xs">Card thumbnail</span>
          </label>
          <input 
            type="file" 
            @change="uploadMainImage" 
            accept="image/*" 
            class="file-input file-input-bordered file-input-primary w-full"
            :disabled="uploading"
          />
          <div v-if="uploading" class="mt-3">
            <progress class="progress progress-primary w-full"></progress>
            <p class="text-sm text-center mt-1 opacity-70">Uploading...</p>
          </div>
          <div v-if="form.image" class="mt-4 relative inline-block">
            <img :src="form.image" class="h-40 rounded-lg shadow-lg object-cover" />
            <button 
              type="button"
              @click="form.image = ''"
              class="btn btn-circle btn-xs btn-error absolute -top-2 -right-2 shadow-lg">
              ✕
            </button>
          </div>
          <div class="collapse collapse-arrow bg-base-300 mt-3">
            <input type="checkbox" /> 
            <div class="collapse-title text-sm font-medium">Advanced: Paste URL manually</div>
            <div class="collapse-content">
              <input 
                v-model="form.image" 
                type="text" 
                class="input input-bordered w-full input-sm mt-2" 
                placeholder="https://example.com/image.jpg" 
              />
            </div>
          </div>
        </div>


        <div class="divider"></div>
        <div>
          <label class="label">
            <span class="label-text font-semibold">Gallery Images</span>
            <span class="label-text-alt">
              <span class="badge badge-sm">{{ form.images.length }}</span> images
            </span>
          </label>
          <input 
            type="file" 
            @change="uploadGalleryImages" 
            accept="image/*" 
            multiple 
            class="file-input file-input-bordered file-input-secondary w-full"
            :disabled="uploading"
          />
          <div v-if="uploading" class="mt-3">
            <progress class="progress progress-secondary w-full"></progress>
            <p class="text-sm text-center mt-1 opacity-70">Uploading images...</p>
          </div>
          <div v-if="form.images.length" class="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
            <div 
              v-for="(img, i) in form.images" 
              :key="i" 
              class="relative group aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <img :src="img" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition"></div>
              <button 
                type="button"
                @click="removeGalleryImage(i)"
                class="btn btn-circle btn-xs btn-error absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition shadow-lg">
                ✕
              </button>
            </div>
          </div>
          <div class="collapse collapse-arrow bg-base-300 mt-3">
            <input type="checkbox" /> 
            <div class="collapse-title text-sm font-medium">Advanced: Paste URLs manually (one per line)</div>
            <div class="collapse-content">
              <textarea 
                v-model="imagesText" 
                class="textarea textarea-bordered w-full h-24 text-sm mt-2"
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-200 p-4">
      <h4 class="font-bold text-lg mb-4 flex items-center gap-2">
        <span class="badge badge-primary">5</span> Tech Stack
      </h4>
      <div class="form-control">
        <label class="label">
          <span class="label-text font-semibold">Technologies</span>
          <span class="label-text-alt text-xs">Comma separated (press Tab or click out to update)</span>
        </label>
        <input 
          v-model="stackInput" 
          type="text" 
          class="input input-bordered focus:input-primary"
          placeholder="Vue, Nuxt, Tailwind CSS, TypeScript"
          @blur="updateStack"
        />
        <div v-if="form.stack.length" class="flex flex-wrap gap-2 mt-3">
          <span 
            v-for="(tech, i) in form.stack" 
            :key="tech" 
            class="badge badge-outline badge-lg gap-2"
          >
            {{ tech }}
            <button 
              type="button"
              @click="removeStack(i)"
              class="text-error hover:scale-125 transition">
              ✕
            </button>
          </span>
        </div>
      </div>
    </div>

    <div v-if="errorMessage" class="alert alert-error">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ errorMessage }}</span>
    </div>

    <div class="flex gap-3 pt-4 border-t sticky bottom-0 bg-base-100 pb-4">
      <button type="button" @click="$emit('cancel')" class="btn btn-ghost flex-1">
        Cancel
      </button>
      <button type="submit" class="btn btn-primary flex-1" :disabled="submitting || uploading">
        <span v-if="submitting" class="loading loading-spinner"></span>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
        </svg>
        {{ submitting ? 'Saving...' : (project ? 'Update Project' : 'Create Project') }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
const props = defineProps<{
  project?: any
  adminSecret: string
}>()

const emit = defineEmits<{
  success: []
  cancel: []
}>()

const submitting = ref(false)
const uploading = ref(false)
const errorMessage = ref('')
const stackInput = ref('')
const imagesInput = ref('')

const form = reactive({
  key: '',
  titleEn: '',
  titleRu: '',
  descEn: '',
  descRu: '',
  descriptionEn: '',
  descriptionRu: '',
  link: '',
  image: '',
  images: [] as string[],
  stack: [] as string[]
})

watch(() => props.project, (newProject) => {
  if (newProject) {
    form.key = newProject.key || ''
    form.titleEn = newProject.titleEn || ''
    form.titleRu = newProject.titleRu || ''
    form.descEn = newProject.descEn || ''
    form.descRu = newProject.descRu || ''
    form.descriptionEn = newProject.descriptionEn || ''
    form.descriptionRu = newProject.descriptionRu || ''
    form.link = newProject.link || ''
    form.image = newProject.image || ''
    form.images = newProject.images ? [...newProject.images] : []
    form.stack = newProject.stack ? [...newProject.stack] : []
    stackInput.value = newProject.stack ? newProject.stack.join(', ') : ''
    imagesInput.value = newProject.images ? newProject.images.join('\n') : ''
  } else {
    form.key = ''
    form.titleEn = ''
    form.titleRu = ''
    form.descEn = ''
    form.descRu = ''
    form.descriptionEn = ''
    form.descriptionRu = ''
    form.link = ''
    form.image = ''
    form.images = []
    form.stack = []
    stackInput.value = ''
    imagesInput.value = ''
  }
  errorMessage.value = ''
}, { immediate: true })

const imagesText = computed({
  get: () => imagesInput.value,
  set: (value) => {
    imagesInput.value = value
    form.images = value.split('\n').map(s => s.trim()).filter(Boolean)
  }
})

const updateStack = () => {
  form.stack = stackInput.value
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
}

const removeStack = (index: number) => {
  form.stack.splice(index, 1)
  stackInput.value = form.stack.join(', ')
}

const uploadMainImage = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  uploading.value = true
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await $fetch('/api/admin/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${props.adminSecret}`
      },
      body: formData
    })

    form.image = response.url
  } catch (err: any) {
    errorMessage.value = 'Upload failed: ' + err.message
  } finally {
    uploading.value = false
  }
}

const uploadGalleryImages = async (event: Event) => {
  const files = Array.from((event.target as HTMLInputElement).files || [])
  if (!files.length) return

  uploading.value = true
  try {
    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)

      const response = await $fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${props.adminSecret}`
        },
        body: formData
      })

      form.images.push(response.url)
    }
  } catch (err: any) {
    errorMessage.value = 'Upload failed: ' + err.message
  } finally {
    uploading.value = false
  }
}

const removeGalleryImage = (index: number) => {
  form.images.splice(index, 1)
}

const handleSubmit = async () => {
  submitting.value = true
  errorMessage.value = ''
  updateStack()

  try {
    if (props.project) {
      await $fetch(`/api/admin/projects/${props.project.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${props.adminSecret}`
        },
        body: form
      })
    } else {
      await $fetch('/api/admin/projects', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${props.adminSecret}`
        },
        body: form
      })
    }

    emit('success')
  } catch (err: any) {
    errorMessage.value = err.data?.message || err.message || 'Failed to save project'
  } finally {
    submitting.value = false
  }
}
</script>

