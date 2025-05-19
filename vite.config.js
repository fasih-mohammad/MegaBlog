import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(),react()],
  server: {
  proxy: {
    '/v1': {
      target: 'https://fra.cloud.appwrite.io',
      changeOrigin: true,
      secure: false,
    }
  }
}
})
