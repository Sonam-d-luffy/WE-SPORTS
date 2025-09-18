import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Anything that starts with /pincode will go to Postal API
      "/pincode": {
        target: "https://api.postalpincode.in",
        changeOrigin: true,
        secure: true, // since it's HTTPS
        rewrite: (path) => path.replace(/^\/pincode/, "")
      }
    }
  }
})
