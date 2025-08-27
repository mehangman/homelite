import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change "homelite-frontend" if repo name is different
export default defineConfig({
  plugins: [react()],
  base: '/homelite-frontend/'
})
