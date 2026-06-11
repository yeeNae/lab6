import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/lab6/',
  plugins: [
    tailwindcss(),
  ],
})
