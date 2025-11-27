import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Elimina la importación de @tailwindcss/vite
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})