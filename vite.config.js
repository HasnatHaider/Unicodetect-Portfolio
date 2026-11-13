import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { createSocialPreviewHandler } from './server/socialPreviewHandler.js'

const socialPreviewApi = () => ({
  name: 'social-preview-api',
  configureServer(server) {
    const handle = createSocialPreviewHandler();
    server.middlewares.use('/api/v1/social-preview', async (req, res) => {
      try {
        const request = new Request(`http://${req.headers.host}${req.originalUrl || req.url}`, { method: req.method, headers: req.headers });
        const response = await handle(request);
        res.writeHead(response.status, Object.fromEntries(response.headers));
        res.end(await response.text());
      } catch {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Preview unavailable. Please retry.' }));
      }
    });
  },
});

export default defineConfig({
  plugins: [
    socialPreviewApi(),
    react(),
    ViteImageOptimizer({
      include: /\.(png|jpe?g|webp|avif)$/i,
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { lossless: false, quality: 80 },
      svg: false,
    }),
  ],
  build: {
    cssCodeSplit: true,
    manifest: true,
    assetsInlineLimit: (filePath) =>
      /\.(png|jpe?g|webp|avif|gif)$/i.test(filePath) ? false : undefined,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("entry-server")) return;
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/react-router-dom')) {
            return 'vendor-router'
          }
          if (id.includes('node_modules/lucide-react') || id.includes('node_modules/sonner')) {
            return 'vendor-ui'
          }
        },
      },
    },
  },
})
