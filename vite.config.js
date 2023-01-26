import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: import.meta.env === "development" ? '/' : '/oracle/',
  server: {
    proxy: {
      "/api": {
          target: "http://phpplayground.local/oracle_backend",
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
