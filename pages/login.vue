<template>
  <div class="max-w-md mx-auto mt-20">
    <el-form :model="{ email, password }" @submit.prevent="handleLogin">
      <el-form-item label="Email">
        <el-input v-model="email" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="password" type="password" />
      </el-form-item>
      <el-button type="primary" native-type="submit" :loading="loading">Login</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { ElMessage } from 'element-plus'

const email = ref('')
const password = ref('')
const loading = ref(false)

const auth = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  try {
    await auth.login(email.value, password.value)
    await auth.fetchUserRole()

    switch (auth.role) {
      case 'admin':
        router.push('/admin')
        break
      case 'creator':
        router.push('/creator')
        break
      default:
        router.push('/viewer')
    }
  } catch (error) {
    console.error('Login error:', error)
    ElMessage.error('Login xato! Email yoki parol notogri.')
  } finally {
    loading.value = false
  }
}
</script>
