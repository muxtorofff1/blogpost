<template>
  <div class="relative p-4">
    <h2 class="text-2xl font-bold mb-4">👀 Viewer sahifasi</h2>

    <button @click="showList = !showList" class="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow">
      List
    </button>

    <PostItem
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :canEdit="false"
      :canDelete="false"
    />

    <div v-if="showList" class="fixed top-20 right-4 bg-white border shadow-md p-4 max-w-md w-full z-50 rounded">
      <h3 class="text-lg font-semibold mb-2">Postlar </h3>
      <ul>
        <li v-for="post in posts" :key="post.id" class="mb-2 border p-2 rounded">
          <h4 class="font-bold">{{ post.title }}</h4>
          <p>{{ post.content }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { usePostStore } from '~/stores/posts'
import PostItem from '~/components/PostItem.vue'

const showList = ref(false)
const postStore = usePostStore()
const auth = useAuthStore()

const posts = postStore.posts

onMounted(async () => {
  await auth.init()
  await postStore.fetchPosts()
})
</script>
