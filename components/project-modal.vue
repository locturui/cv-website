<template>
  <dialog ref="dialog" class="modal modal-bottom sm:modal-middle backdrop-blur-sm">
    <div class="modal-box !max-w-7xl !p-0 !max-h-[90vh] overflow-y-auto bg-gradient-to-br from-base-100 via-base-100 to-base-200/50 shadow-2xl border border-base-300">
      <div class="sticky top-0 z-20 flex justify-end p-4 bg-gradient-to-b from-base-100 via-base-100 to-transparent pointer-events-none">
        <button 
          @click="closeModal"
          class="btn btn-sm btn-circle btn-ghost bg-base-100/80 backdrop-blur-sm hover:bg-error hover:text-error-content transition-all duration-300 hover:rotate-90 pointer-events-auto">
          ✕
        </button>
      </div>

      <div v-if="project" class="px-8 pb-8 -mt-8">
        <h3 class="font-bold text-4xl mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{{ project.title }}</h3>

        <div class="flex flex-col lg:flex-row gap-8">
          <div class="lg:w-3/5 flex-shrink-0">
            <div class="relative rounded-2xl overflow-hidden mb-4 shadow-2xl ring-1 ring-base-300 group cursor-pointer" @click="openFullscreen">
              <img 
                :src="project.images[currentImageIndex]" 
                :alt="$t('proj.modal.imageAlt', { title: project.title, index: currentImageIndex + 1 })"
                class="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-contain bg-base-200 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <template v-if="project.images.length > 1">
                <button 
                  @click.stop="previousImage"
                  class="btn btn-circle btn-sm absolute left-4 top-1/2 -translate-y-1/2 bg-base-100/90 backdrop-blur-md hover:bg-primary hover:scale-110 transition-all duration-300 border-0 shadow-lg">
                  ❮
                </button>
                <button 
                  @click.stop="nextImage"
                  class="btn btn-circle btn-sm absolute right-4 top-1/2 -translate-y-1/2 bg-base-100/90 backdrop-blur-md hover:bg-primary hover:scale-110 transition-all duration-300 border-0 shadow-lg">
                  ❯
                </button>
              
                <div class="absolute bottom-4 right-4 bg-base-100/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold shadow-lg border border-base-300">
                  {{ currentImageIndex + 1 }} / {{ project.images.length }}
                </div>
              </template>
              
              <div class="absolute top-4 left-4 bg-base-100/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg border border-base-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {{ $t('proj.modal.fullscreenHint') }}
              </div>
            </div>

            <div v-if="project.images.length > 1" class="flex gap-2 sm:gap-3 overflow-x-auto py-6 px-8 -mx-8 relative z-10">
              <button
                v-for="(image, index) in project.images"
                :key="index"
                @click="currentImageIndex = index"
                :class="[
                  'flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 sm:hover:scale-110 relative z-20',
                  currentImageIndex === index ? 'border-primary scale-105 sm:scale-110 ring-2 ring-primary/30 shadow-xl' : 'border-base-300 opacity-60 hover:opacity-100 hover:border-primary/50'
                ]">
                <img 
                  :src="image" 
                  :alt="$t('proj.modal.thumbnailAlt', { index: index + 1 })"
                  class="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover"
                />
              </button>
            </div>
          </div>

          <div class="lg:w-2/5 flex flex-col">
            <div class="mb-8 p-6 rounded-2xl bg-gradient-to-br from-base-200/50 to-transparent border border-base-300/50">
              <h4 class="font-bold text-xl mb-4 flex items-center gap-2">
                <span class="w-1 h-6 bg-primary rounded-full"></span>
                {{ $t('proj.modal.about') }}
              </h4>
              <p class="text-base opacity-80 whitespace-pre-line leading-relaxed">{{ project.description }}</p>
            </div>

            <div class="mb-8 p-6 rounded-2xl bg-gradient-to-br from-base-200/50 to-transparent border border-base-300/50">
              <h4 class="font-bold text-xl mb-4 flex items-center gap-2">
                <span class="w-1 h-6 bg-secondary rounded-full"></span>
                {{ $t('proj.modal.tech') }}
              </h4>
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="tag in project.stack"
                  :key="tag"
                  class="badge badge-lg badge-primary badge-outline hover:badge-primary transition-all duration-300 hover:scale-110">
                  {{ tag }}
                </div>
              </div>
            </div>

            <div class="mt-auto flex flex-col gap-3">
              <div class="flex gap-3">
                <a 
                  v-if="project.githubLink"
                  :href="project.githubLink"
                  target="_blank"
                  class="custom-btn custom-btn-secondary flex-1 group">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
                  </svg>
                  {{ $t('proj.modal.viewGithub') }}
                </a>
                <a 
                  v-if="project.deployLink"
                  :href="project.deployLink"
                  target="_blank"
                  class="custom-btn custom-btn-primary flex-1 group">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                  {{ $t('proj.modal.viewDemo') }}
                </a>
              </div>
              <button @click="closeModal" class="custom-btn custom-btn-ghost w-full">{{ $t('proj.modal.close') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="closeModal">{{ $t('proj.modal.close') }}</button>
    </form>
  </dialog>

  <Teleport to="body">
    <div 
      v-if="showFullscreen" 
      ref="fullscreenRef"
      class="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center"
      style="z-index: 99999 !important; position: fixed !important; pointer-events: auto !important;"
      @click="handleFullscreenClick"
    >
      <button 
        @click.stop="closeFullscreen"
        class="absolute top-4 right-4 z-[100000] btn btn-circle btn-lg bg-base-100/90 hover:bg-error hover:text-error-content border-0 shadow-2xl transition-all duration-300 hover:rotate-90"
        style="pointer-events: auto !important; z-index: 100000 !important;"
      >
        ✕
      </button>
      
      <div class="relative w-full h-full flex items-center justify-center p-4" @click.stop style="pointer-events: auto;">
        <img 
          :src="project?.images[fullscreenImageIndex]" 
          :alt="project ? $t('proj.modal.imageAlt', { title: project.title, index: fullscreenImageIndex + 1 }) : ''"
          class="max-w-full max-h-full object-contain"
          @click.stop
          style="pointer-events: none;"
        />
        
        <template v-if="project && project.images.length > 1">
          <button 
            @click.stop="previousFullscreenImage"
            class="absolute left-4 top-1/2 -translate-y-1/2 z-[100000] btn btn-circle btn-lg bg-base-100/90 backdrop-blur-md hover:bg-primary hover:scale-110 transition-all duration-300 border-0 shadow-2xl"
            style="pointer-events: auto !important; z-index: 100000 !important;"
          >
            ❮
          </button>
          <button 
            @click.stop="nextFullscreenImage"
            class="absolute right-4 top-1/2 -translate-y-1/2 z-[100000] btn btn-circle btn-lg bg-base-100/90 backdrop-blur-md hover:bg-primary hover:scale-110 transition-all duration-300 border-0 shadow-2xl"
            style="pointer-events: auto !important; z-index: 100000 !important;"
          >
            ❯
          </button>
          
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-base-100/90 backdrop-blur-md px-6 py-3 rounded-full text-sm font-semibold shadow-2xl border border-base-300 pointer-events-none">
            {{ fullscreenImageIndex + 1 }} / {{ project.images.length }}
          </div>
        </template>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface Project {
  title: string
  description: string
  link?: string
  githubLink?: string
  deployLink?: string
  images: string[]
  stack: string[]
}

const dialog = ref<HTMLDialogElement | null>(null)
const project = ref<Project | null>(null)
const currentImageIndex = ref(0)
const showFullscreen = ref(false)
const fullscreenImageIndex = ref(0)
const fullscreenRef = ref<HTMLDivElement | null>(null)

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

const openFullscreen = () => {
  if (project.value) {
    fullscreenImageIndex.value = currentImageIndex.value
    showFullscreen.value = true
    document.body.style.overflow = 'hidden'
    if (dialog.value) {
      dialog.value.close()
      nextTick(() => {
        const backdrop = document.querySelector('.modal-backdrop')
        if (backdrop) {
          (backdrop as HTMLElement).style.display = 'none'
          ;(backdrop as HTMLElement).style.pointerEvents = 'none'
        }
        const style = document.createElement('style')
        style.id = 'fullscreen-gallery-override'
        style.textContent = `
          dialog::backdrop {
            display: none !important;
            pointer-events: none !important;
            opacity: 0 !important;
          }
          dialog:not([open])::backdrop {
            display: none !important;
          }
        `
        document.head.appendChild(style)
      })
    }
    nextTick(() => {
      if (fullscreenRef.value) {
        fullscreenRef.value.style.zIndex = '99999'
        fullscreenRef.value.style.pointerEvents = 'auto'
      }
    })
  }
}

const handleFullscreenClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    closeFullscreen()
  }
}

const closeFullscreen = () => {
  showFullscreen.value = false
  document.body.style.overflow = ''
  const overrideStyle = document.getElementById('fullscreen-gallery-override')
  if (overrideStyle) {
    overrideStyle.remove()
  }
  nextTick(() => {
    if (dialog.value && project.value) {
      const backdrop = document.querySelector('.modal-backdrop')
      if (backdrop) {
        (backdrop as HTMLElement).style.display = ''
        ;(backdrop as HTMLElement).style.pointerEvents = ''
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (dialog.value && project.value) {
            dialog.value.showModal()
          }
        })
      })
    }
  })
}

const nextFullscreenImage = () => {
  if (project.value && fullscreenImageIndex.value < project.value.images.length - 1) {
    fullscreenImageIndex.value++
  } else if (project.value) {
    fullscreenImageIndex.value = 0
  }
}

const previousFullscreenImage = () => {
  if (project.value && fullscreenImageIndex.value > 0) {
    fullscreenImageIndex.value--
  } else if (project.value) {
    fullscreenImageIndex.value = project.value.images.length - 1
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (showFullscreen.value) {
    if (e.key === 'ArrowLeft') {
      previousFullscreenImage()
    } else if (e.key === 'ArrowRight') {
      nextFullscreenImage()
    } else if (e.key === 'Escape') {
      closeFullscreen()
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
})

defineExpose({ openModal })
</script>

