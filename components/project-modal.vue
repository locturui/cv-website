<template>
  <dialog ref="dialog" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box !max-w-7xl">
      <button 
        @click="closeModal"
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10">
        ✕
      </button>

      <div v-if="project">
        <h3 class="font-bold text-3xl mb-6">{{ project.title }}</h3>

        <div class="flex flex-col lg:flex-row gap-8">
          <div class="lg:w-3/5 flex-shrink-0">
            <div class="relative rounded-lg overflow-hidden mb-3">
              <img 
                :src="project.images[currentImageIndex]" 
                :alt="`${project.title} - Image ${currentImageIndex + 1}`"
                class="w-full h-[500px] object-cover"
              />
              
              <template v-if="project.images.length > 1">
                <button 
                  @click="previousImage"
                  class="btn btn-circle btn-sm absolute left-2 top-1/2 -translate-y-1/2 bg-base-100/70 hover:bg-base-100">
                  ❮
                </button>
                <button 
                  @click="nextImage"
                  class="btn btn-circle btn-sm absolute right-2 top-1/2 -translate-y-1/2 bg-base-100/70 hover:bg-base-100">
                  ❯
                </button>
              
                <div class="absolute bottom-4 right-4 bg-base-100/70 px-3 py-1 rounded-full text-sm">
                  {{ currentImageIndex + 1 }} / {{ project.images.length }}
                </div>
              </template>
            </div>

            <div v-if="project.images.length > 1" class="flex gap-2 overflow-x-auto pb-2">
              <button
                v-for="(image, index) in project.images"
                :key="index"
                @click="currentImageIndex = index"
                :class="[
                  'flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all',
                  currentImageIndex === index ? 'border-primary scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                ]">
                <img 
                  :src="image" 
                  :alt="`Thumbnail ${index + 1}`"
                  class="w-20 h-20 object-cover"
                />
              </button>
            </div>
          </div>

          <div class="lg:w-2/5 flex flex-col">
            <div class="mb-6">
              <h4 class="font-semibold text-xl mb-3">{{ $t('proj.modal.about') }}</h4>
              <p class="text-base opacity-90 whitespace-pre-line leading-relaxed">{{ project.description }}</p>
            </div>

            <div class="mb-6">
              <h4 class="font-semibold text-xl mb-3">{{ $t('proj.modal.tech') }}</h4>
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="tag in project.stack"
                  :key="tag"
                  class="badge badge-lg badge-outline">
                  {{ tag }}
                </div>
              </div>
            </div>

            <div class="mt-auto flex gap-3">
              <a 
                v-if="project.link"
                :href="project.link"
                target="_blank"
                class="btn btn-primary">
                {{ $t('proj.modal.viewProject') }}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </a>
              <button @click="closeModal" class="btn">{{ $t('proj.modal.close') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="closeModal">close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
interface Project {
  title: string
  description: string
  link?: string
  images: string[]
  stack: string[]
}

const dialog = ref<HTMLDialogElement | null>(null)
const project = ref<Project | null>(null)
const currentImageIndex = ref(0)

const openModal = (p: Project) => {
  project.value = p
  currentImageIndex.value = 0
  dialog.value?.showModal()
}

const closeModal = () => {
  dialog.value?.close()
}

const nextImage = () => {
  if (project.value && currentImageIndex.value < project.value.images.length - 1) {
    currentImageIndex.value++
  } else {
    currentImageIndex.value = 0
  }
}

const previousImage = () => {
  if (project.value && currentImageIndex.value > 0) {
    currentImageIndex.value--
  } else if (project.value) {
    currentImageIndex.value = project.value.images.length - 1
  }
}

defineExpose({ openModal })
</script>

