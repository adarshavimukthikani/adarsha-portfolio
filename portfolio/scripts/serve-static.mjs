// Local QA server for the production bundle and its Netlify/Cloudflare fallback.
// This is a development utility, not part of the deployed application.
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.txt': 'text/plain' };
export async function startStaticPreview(port = 4174) {
  const root = path.resolve('dist');
  const redirects = await readFile(path.join(root, '_redirects'), 'utf8');
  if (!/^\/\*\s+\/index\.html\s+200\s*$/m.test(redirects)) throw new Error('Production SPA fallback is missing from dist/_redirects.');
  const server = http.createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      let target = path.resolve(root, `.${pathname}`);
      if (target !== root && !target.startsWith(root + path.sep)) { response.writeHead(403); response.end(); return; }
      try { const info = await stat(target); if (info.isDirectory()) target = path.join(target, 'index.html'); await stat(target); }
      catch { target = path.join(root, 'index.html'); }
      const data = await readFile(target);
      response.writeHead(200, { 'Content-Type': mime[path.extname(target)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      response.end(request.method === 'HEAD' ? undefined : data);
    } catch { response.writeHead(404); response.end('Not found'); }
  });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(port, '127.0.0.1', resolve); });
  return server;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 4173);
  await startStaticPreview(port);
  console.log(`Local: http://127.0.0.1:${port}`);
}
