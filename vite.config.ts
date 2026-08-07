import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5174,
  },
  preview: {
    host: true,
  },
  // Garante /historia no preview/build (Vite já faz fallback no dev).
  appType: "spa",
})
