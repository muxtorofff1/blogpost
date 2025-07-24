<template>
  <el-card class="mb-2">
    <h3 class="text-lg font-semibold">{{ post.title }}</h3>
    <p class="mb-2">{{ post.content }}</p>

    <div v-if="canEdit || canDelete" class="flex gap-2 mt-2">
      <el-button size="small" v-if="canEdit" @click="editPost">Edit</el-button>
      <el-button size="small" type="danger" v-if="canDelete" @click="deletePost">Delete</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { usePostStore } from '~/stores/posts'
import type { Post } from '~/stores/posts'

const props = defineProps<{
  post: Post
  canEdit: boolean
  canDelete: boolean
}>()

const postStore = usePostStore()

const editPost = () => {
  const newTitle = prompt('New title:', props.post.title)
  if (newTitle) {
    postStore.updatePost(props.post.id, { title: newTitle })
  }
}

const deletePost = () => {
  if (confirm('Rostdan ham o‘chirishni xohlaysizmi?')) {
    postStore.deletePost(props.post.id)
  }
}
</script>
