import { useAuthStore } from '~/stores/auth'
export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()
  if (!auth.user) await auth.fetchUserRole()
  const mapping: Record<string, string> = { '/admin': 'admin', '/creator': 'creator' }
  const req = mapping[to.path]
  if (req && auth.role !== req) return navigateTo('/login')
})
