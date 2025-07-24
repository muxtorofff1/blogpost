<template>
  <el-form @submit.prevent="handleSubmit">
    <el-form-item label="Title">
      <el-input v-model="title" />
    </el-form-item>
    <el-form-item label="Content">
      <el-input type="textarea" v-model="content" />
    </el-form-item>
    <el-button type="primary" native-type="submit">Yaratish</el-button>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePostStore } from '~/stores/posts'
import { useAuthStore } from '~/stores/auth'

const title = ref('')
const content = ref('')
const posts = usePostStore()
const auth = useAuthStore()

const handleSubmit = async () => {
  if (!title.value.trim() || !content.value.trim()) return

  await posts.createPost({
    title: title.value,
    content: content.value,
  })

  title.value = ''
  content.value = ''
}
</script>
