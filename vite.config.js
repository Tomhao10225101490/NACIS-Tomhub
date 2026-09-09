import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const base = process.env.VITE_BASE || '/';

export default defineConfig({
  base,
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'manifest.webmanifest'],
      manifest: false,
      workbox: {
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        globPatterns: ['**/*.{js,css,html,svg,webmanifest}'],
        navigateFallback: null,
        runtimeCaching: [
          {
            urlPattern: /assets\/.+\.js$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'toms-js-v4',
              networkTimeoutSeconds: 4,
              expiration: { maxEntries: 48, maxAgeSeconds: 60 * 60 * 6 },
            },
          },
        ],
      },
    }),
  ],
  test: {
    environment: 'happy-dom',
  },
});
