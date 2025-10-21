<template>
  <div class="min-h-screen bg-base-200">
    <div v-if="checkingAuth" class="min-h-screen flex items-center justify-center">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>
    
    <div v-else-if="!isAuthenticated" class="min-h-screen flex items-center justify-center p-4">
      <div class="card bg-base-100 shadow-2xl w-full max-w-md">
        <div class="card-body">
          <h2 class="text-3xl font-bold text-center mb-6">Admin Access</h2>
          <div class="form-control">
            <input 
              v-model="adminSecret" 
              type="password" 
              placeholder="Enter password"
              class="input input-bordered input-lg text-center"
              @keyup.enter="authenticate"
              autofocus
            />
          </div>
          <button @click="authenticate" class="btn btn-primary btn-lg mt-4">
            Login
          </button>
          <p v-if="authError" class="text-error text-center mt-4">{{ authError }}</p>
        </div>
      </div>
    </div>

    <div v-else class="flex">
      <aside class="w-64 min-h-screen bg-base-100 shadow-lg">
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-6">Admin Panel</h2>
          <nav class="space-y-2">
            <NuxtLink 
              to="/admin" 
              class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition-colors"
              active-class="bg-primary text-primary-content hover:bg-primary"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              <span class="font-medium">Projects</span>
            </NuxtLink>

            <NuxtLink 
              to="/admin/experience" 
              class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition-colors"
              active-class="bg-primary text-primary-content hover:bg-primary"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span class="font-medium">Experience</span>
            </NuxtLink>

            <NuxtLink 
              to="/admin/skills" 
              class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition-colors"
              active-class="bg-primary text-primary-content hover:bg-primary"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
              <span class="font-medium">Skills</span>
            </NuxtLink>
          </nav>

          <div class="mt-8 pt-8 border-t border-base-200">
            <NuxtLink 
              to="/" 
              class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition-colors text-base-content/60 hover:text-base-content"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              <span class="font-medium">Back to Site</span>
            </NuxtLink>
            
            <button 
              @click="logout"
              class="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-error/10 hover:text-error transition-colors mt-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              <span class="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      <main class="flex-1 p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const adminSecret = useState('adminSecret', () => '')
const isAuthenticated = useState('isAuthenticated', () => false)
const authError = ref('')
const checkingAuth = ref(true)

onMounted(async () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('admin_secret')
    if (stored) {
      adminSecret.value = stored
      try {
        await $fetch('/api/admin/projects', {
          query: { secret: stored }
        })
        isAuthenticated.value = true
      } catch (error) {
        localStorage.removeItem('admin_secret')
        adminSecret.value = ''
        isAuthenticated.value = false
      }
    }
  }
  checkingAuth.value = false
})

const authenticate = async () => {
  if (!adminSecret.value) {
    authError.value = 'Please enter password'
    return
  }

  try {
    await $fetch('/api/admin/projects', {
      query: { secret: adminSecret.value }
    })
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_secret', adminSecret.value)
    }
    isAuthenticated.value = true
    authError.value = ''
  } catch (err: any) {
    authError.value = 'Invalid password'
    isAuthenticated.value = false
  }
}

const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_secret')
  }
  adminSecret.value = ''
  isAuthenticated.value = false
  navigateTo('/admin')
}
</script>

