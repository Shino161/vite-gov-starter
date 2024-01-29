import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import { resolve } from 'path'
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
  build: {
    outDir: 'build',
    // rollupOptions: {
    //   input: {
    //     'main/index': './index.html',
    //     'custom/index': './index-custom.html',
    //   },
    // },
  },
  server: {
    proxy: {
      '^/api/.*': {
        target: 'https://192.168.1.xxx',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
