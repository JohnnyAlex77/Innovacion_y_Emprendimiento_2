// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // Asegurar que la raíz es el directorio actual
  publicDir: 'public',
  optimizeDeps: {
    include: ['leaflet']
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});