import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isProduction = command === 'build'
  
  return {
    plugins: [vue()],
    base: isProduction ? '/creative-display/' : '/',
  }
})
