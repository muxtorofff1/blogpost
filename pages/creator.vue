<template>
  <div class="relative p-4">
    <h2 class="text-2xl font-bold mb-4">✍️ Creator sahifasi</h2>

    <button @click="showList = !showList" class="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow">
      List
    </button>

    <PostForm />

    <PostItem
      v-for="post in myPosts"
      :key="post.id"
      :post="post"
      :canEdit="true"
      :canDelete="true"
    />

    <div v-if="showList" class="fixed top-20 right-4 bg-white border shadow-md p-4 max-w-md w-full z-50 rounded">
      <h3 class="text-lg font-semibold mb-2">Saqlangan postlar</h3>
      <ul>
        <li v-for="post in myPosts" :key="post.id" class="mb-2 border p-2 rounded">
          <h4 class="font-bold">{{ post.title }}</h4>
          <p>{{ post.content }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { usePostStore } from '~/stores/posts'
import PostForm from '~/components/PostFrom.vue'
import PostItem from '~/components/PostItem.vue'

const showList = ref(false)
const postStore = usePostStore()
const auth = useAuthStore()

const posts = postStore.posts
const myPosts = computed(() => posts.filter(p => p.author_id === auth.user?.id))

onMounted(async () => {
  await auth.init()
  await postStore.fetchPosts()
})
</script>
