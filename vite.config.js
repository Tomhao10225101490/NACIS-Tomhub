import { defineConfig } from 'vite';

// GitHub Pages project site: https://<user>.github.io/NACIS-Tomhub/
// Local `npm run dev` keeps base `/` unless VITE_BASE is set.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});
