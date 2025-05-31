import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure base URL is root for development and production
  publicDir: 'public', // Explicitly specify the public directory
  optimizeDeps: {
    include: ['face-api.js'], // Explicitly tell Vite to pre-bundle face-api.js
  },
  server: {
    // This part is crucial if your Vite setup is trying to serve index.html for all routes
    // For development, it ensures direct static file access.
    // Ensure you are not redirecting all non-API paths to index.html using historyApiFallback or similar.
    fs: {
      // Allow serving files from the public directory explicitly
      strict: true,
      cachedChecks: true
    },
    // Rewrite specific requests if necessary, but this is usually not needed for public/
    // If problem persists, we might need to look into connect-history-api-fallback or similar Vite plugins
  }
})