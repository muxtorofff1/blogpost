import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export interface Post {
  id: string
  title: string
  content: string
  author_id: string
  published?: boolean
}

export const usePostStore = defineStore('posts', {
  state: () => ({
    posts: [] as Post[]
  }),

  actions: {
    async fetchPosts() {
      const { $supabase } = useNuxtApp()
      const auth = useAuthStore()

      await auth.fetchUser()

      if (!auth.user || !auth.role) {
        console.warn('User login qilmagan')
        this.posts = []
        return
      }

      let query = $supabase.from('posts').select('*')

      if (auth.role === 'creator') {
        query = query.eq('author_id', auth.user.id)
      } else if (auth.role === 'viewer') {
        query = query.eq('published', true)
      }

      const { data, error } = await query
      if (error) {
        console.error('Postlarni olishda xato:', error.message)
        return
      }

      this.posts = data || []
    },

    async createPost(post: { title: string; content: string }) {
      const { $supabase } = useNuxtApp()
      const auth = useAuthStore()

      if (!auth.user || (auth.role !== 'creator' && auth.role !== 'admin')) {
        console.warn('Ruxsat yoq')
        return
      }

      const newPost = {
        ...post,
        author_id: auth.user.id,
        published: true
      }

      const { error } = await $supabase.from('posts').insert(newPost)
      if (error) {
        console.error('Post yaratishda xato:', error.message)
        return
      }

      await this.fetchPosts()
    },

    async updatePost(id: string, updates: Partial<Post>) {
      const { $supabase } = useNuxtApp()
      const auth = useAuthStore()

      const post = this.posts.find(p => p.id === id)
      if (!post) return
      if (auth.role === 'viewer') return
      if (auth.role === 'creator' && post.author_id !== auth.user?.id) return

      const { error } = await $supabase.from('posts').update(updates).eq('id', id)
      if (error) {
        console.error('Post yangilashda xato:', error.message)
        return
      }

      await this.fetchPosts() 
    },

    async deletePost(id: string) {
      const { $supabase } = useNuxtApp()
      const auth = useAuthStore()

      const post = this.posts.find(p => p.id === id)
      if (!post) return
      if (auth.role === 'viewer') return
      if (auth.role === 'creator' && post.author_id !== auth.user?.id) return

      const { error } = await $supabase.from('posts').delete().eq('id', id)
      if (error) {
        console.error('Post ochirishda xato:', error.message)
        return
      }

      await this.fetchPosts()
    }
  }
})
