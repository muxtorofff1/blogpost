import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    role: null as string | null,
  }),

  actions: {
    async fetchUser() {
      const { $supabase } = useNuxtApp()
      const { data, error } = await $supabase.auth.getUser()
      if (error) throw error
      this.user = data.user
    },

    async fetchUserRole() {
      const { $supabase } = useNuxtApp()
      if (!this.user || !this.user.id) await this.fetchUser()
      const { data, error } = await $supabase
        .from('profiles')
        .select('role')
        .eq('id', this.user.id)
        .single()
      if (error) throw error
      this.role = data.role
    },

    async login(email: string, password: string) {
      const { $supabase } = useNuxtApp()
      const { data, error } = await $supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        console.error('Login error:', error.message)
        throw new Error('email yoki parol notogri')
      }

      this.user = data.user ?? data.session?.user

      try {
        await this.fetchUserRole()
      } catch (e) {
        console.error('fetchUserRole error:', e)
        throw new Error('Rolingiz topilmadi yoki profil mavjud emas')
      }
    },

    async logout() {
      const { $supabase } = useNuxtApp()
      await $supabase.auth.signOut()
      this.user = null
      this.role = null
    },
    async init() {
      await this.fetchUser()
      await this.fetchUserRole()
    }

  }
})
