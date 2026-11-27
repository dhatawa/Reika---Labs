import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Absolute base: required for clean multi-page URLs (/about/logo must still find /assets).
  // A static preview build can override it: VITE_BASE=./ VITE_ROUTER=hash npm run build
  base: process.env.VITE_BASE ?? '/',
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rolldownOptions: {
      input: {
        main: 'index.html',
        dashboard: 'dashboard/index.html',
        smartGate3d: 'smart-water-gate-3d.html',
      },
    },
  },
})
