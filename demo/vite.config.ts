import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: '/puzzle-geocache/',
  plugins: [react()],
  build: {
    sourcemap: false, // Disable sourcemaps in production to avoid 404 errors
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
});
