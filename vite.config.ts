/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import windicss from 'vite-plugin-windicss'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue(), windicss()],
  build: {
    minify: true
  },
  test: {
    global: true,
    environment: 'happy-dom'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  base: '/simple-calculator/'
})
