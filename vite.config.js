import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { env } from 'node:process'

export default defineConfig({
  plugins: [react()],
  base: env.GITHUB_ACTIONS ? '/satitech-showcase/' : '/',
  build: {
    target: 'es2022',
    sourcemap: true,
    chunkSizeWarningLimit: 950,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three') || id.includes('@react-three')) return 'three-runtime'
          if (id.includes('framer-motion')) return 'motion-runtime'
          if (id.includes('react') || id.includes('scheduler')) return 'react-runtime'
        },
      },
    },
  },
})
