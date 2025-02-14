import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/NewsSwiper/', // Replace with your actual GitHub repo name
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
