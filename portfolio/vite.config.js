import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const siteUrl = process.env.VITE_SITE_URL?.replace(/\/$/, '');
const siteMetadata = {
  name: 'portfolio-site-metadata',
  transformIndexHtml(html) {
    if (!siteUrl) return html;
    const baseUrl = `${new URL(siteUrl).href.replace(/\/$/, '')}/`;
    return html.replace(/(<meta property="og:image" content=")[^"]+/, `$1${baseUrl}images/social-preview.webp`).replace('</head>', `<link rel="canonical" href="${baseUrl}" /><meta property="og:url" content="${baseUrl}" /></head>`);
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss(), siteMetadata],
  base: '/',
  build: { target: 'es2022', sourcemap: false },
});
