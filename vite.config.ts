// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Taekwondo-web-app/', // 👈 use your repo name here
  plugins: [react()],
})
