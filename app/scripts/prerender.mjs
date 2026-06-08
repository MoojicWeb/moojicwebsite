// Prerender each public route into static HTML using headless Chrome.
// Run automatically after `vite build` via the postbuild npm script.
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const PORT = 4173;

// Keep in sync with sitemap.xml and the route table in App.tsx
const routes = [
  '/',
  '/service/in-store-radio',
  '/service/digital-signage',
  '/service/av-hardware',
  '/sample-player',
  '/industries',
  '/games',
  '/blog',
  '/blog/the-science-behind-music-and-retail',
  '/blog/from-boring-to-astounding',
  '/blog/how-in-store-radio-adds-value',
  '/blog/the-magic-of-digital-signage',
  '/contact',
];

const mime = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg',
};

// Serve dist/ locally so Puppeteer can hit a real URL.
// Cache the original SPA shell in memory so it can't be poisoned when we
// write prerendered HTML back to disk during the run.
const spaShell = await readFile(join(DIST, 'index.html'));

const server = createServer(async (req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  const ext = extname(urlPath);
  // No extension = SPA route → always serve the in-memory shell.
  if (!ext) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(spaShell);
    return;
  }
  // Known asset extension → serve from disk with proper MIME.
  try {
    const content = await readFile(join(DIST, urlPath));
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end('Not Found');
  }
});

await new Promise((resolve) => server.listen(PORT, '127.0.0.1', resolve));
console.log(`[prerender] static server on http://127.0.0.1:${PORT}`);

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

let ok = 0;
let failed = 0;

for (const route of routes) {
  const url = `http://127.0.0.1:${PORT}${route}`;
  process.stdout.write(`[prerender] ${route.padEnd(50)} `);
  const page = await browser.newPage();

  // Surface page errors + console messages so we can debug timeouts.
  const errors = [];
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`);
  });

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForFunction(
      () => {
        const root = document.getElementById('root');
        return !!root && root.children.length > 0 && root.textContent && root.textContent.length > 50;
      },
      { timeout: 25000 }
    );
    // Small settle for GSAP, intersection observers, etc.
    await new Promise((r) => setTimeout(r, 1500));

    const html = await page.content();
    const outputPath = route === '/'
      ? join(DIST, 'index.html')
      : join(DIST, route.slice(1), 'index.html');
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html, 'utf8');
    console.log('ok');
    ok++;
  } catch (err) {
    console.log(`FAILED: ${err.message}`);
    if (errors.length) console.log(`  page errors: ${errors.slice(0, 3).join(' | ')}`);
    failed++;
  } finally {
    await page.close();
  }
}

await browser.close();
server.close();
console.log(`[prerender] complete — ${ok} ok, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
