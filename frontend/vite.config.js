import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Serve under /app when building for production; dev remains '/'
  base: command === 'build' ? '/app/' : '/',
  plugins: [react(), tailwindcss()],
}))
