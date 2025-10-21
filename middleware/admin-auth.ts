export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return

  const adminSecret = useState('adminSecret', () => '')
  const isAuthenticated = useState('isAuthenticated', () => false)

  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('admin_secret')
    if (stored && !adminSecret.value) {
      try {
        const response = await $fetch('/api/admin/projects', {
          query: { secret: stored }
        })
        adminSecret.value = stored
        isAuthenticated.value = true
        return
      } catch (error) {
        localStorage.removeItem('admin_secret')
      }
    }
  }

  if (!isAuthenticated.value && to.path !== '/admin') {
    return navigateTo('/admin')
  }
})

