import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Relative base so the build works on Vercel, Netlify, GitHub Pages or any sub-folder.
  base: './',
  build: {
    target: 'es2020',
    cssCodeSplit: true,
  },
})
