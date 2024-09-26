// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://fringale-app.onrender.com',
        secure: false,
      },
    },
  },
  plugins: [react()],
});
