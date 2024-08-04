import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: '.', // Raíz del proyecto
  build: {
    outDir: '../dist', // Salida en la carpeta dist en el nivel superior
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://newbetelapp-production.up.railway.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

