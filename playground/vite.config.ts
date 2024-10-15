import { resolve } from 'path'
import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'src/components'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@icons': resolve(__dirname, 'src/icons'),
      '@pages': resolve(__dirname, 'src/pages'),
    },
  },
})
