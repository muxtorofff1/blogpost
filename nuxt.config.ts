export default defineNuxtConfig({
  plugins: ['~/plugins/supabase.ts'],
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],

  runtimeConfig: {
    public: {
      supabaseUrl: 'https://vkirozndicqbopmuphft.supabase.co',
      supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZraXJvem5kaWNxYm9wbXVwaGZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMzI0NjYsImV4cCI6MjA2NzgwODQ2Nn0.sOp_JgZA2yHD6l_8B61BulZ6c2hIdH-gPECDB3p7MTk'
    }
  }
})
