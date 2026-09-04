const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');

async function testUrl(port, path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:${port}${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          path,
          status: res.statusCode,
          contentType: res.headers['content-type'],
          contentLength: res.headers['content-length'] || data.length,
          body: data,
        });
      });
    }).on('error', (err) => {
      resolve({ path, error: err.message });
    });
  });
}

async function run() {
  const PORT = 3088;
  console.log(`Starting Next.js server on port ${PORT}...`);
  const server = spawn('npx', ['next', 'start', '-p', String(PORT)], {
    cwd: process.cwd(),
    stdio: 'pipe',
  });

  // Wait 3.5 seconds for server to be ready
  await new Promise((r) => setTimeout(r, 3500));

  let allPass = true;

  const endpoints = [
    { path: '/', expectedType: 'text/html' },
    { path: '/manifest.webmanifest', expectedType: 'application/manifest+json' },
    { path: '/manifest.json', expectedType: 'application/json' },
    { path: '/sw.js', expectedType: 'application/javascript' },
    { path: '/favicon.ico', expectedType: 'image/x-icon' },
    { path: '/favicon.svg', expectedType: 'image/svg+xml' },
    { path: '/icon.svg', expectedType: 'image/svg+xml' },
    { path: '/icon-192.png', expectedType: 'image/png' },
    { path: '/icon-512.png', expectedType: 'image/png' },
    { path: '/icon-maskable-192.png', expectedType: 'image/png' },
    { path: '/icon-maskable-512.png', expectedType: 'image/png' },
    { path: '/apple-touch-icon.png', expectedType: 'image/png' },
  ];

  console.log('\n--- 1. Verifying HTTP Endpoints ---');
  for (const ep of endpoints) {
    const res = await testUrl(PORT, ep.path);
    if (res.status === 200 && res.contentType && res.contentType.includes(ep.expectedType)) {
      console.log(`✓ [200 OK] ${ep.path} (${res.contentType}, ${res.contentLength} bytes)`);
    } else {
      console.error(`✗ [FAIL] ${ep.path} - Status: ${res.status}, Type: ${res.contentType}`);
      allPass = false;
    }
  }

  console.log('\n--- 2. Verifying Multi-Resolution Favicon ICO (16, 32, 48) ---');
  try {
    const icoBuf = fs.readFileSync('public/favicon.ico');
    const imageCount = icoBuf.readUInt16LE(4);
    const sizes = [];
    for (let i = 0; i < imageCount; i++) {
      sizes.push({
        w: icoBuf.readUInt8(6 + i * 16),
        h: icoBuf.readUInt8(6 + i * 16 + 1),
      });
    }
    const has16 = sizes.some((s) => s.w === 16 && s.h === 16);
    const has32 = sizes.some((s) => s.w === 32 && s.h === 32);
    const has48 = sizes.some((s) => s.w === 48 && s.h === 48);
    if (imageCount === 3 && has16 && has32 && has48) {
      console.log(`✓ [ICO VALID] 3 bundled resolutions found: 16x16, 32x32, 48x48`);
    } else {
      console.error(`✗ [ICO INVALID] Found sizes:`, sizes);
      allPass = false;
    }
  } catch (err) {
    console.error(`✗ [ICO ERROR]`, err.message);
    allPass = false;
  }

  console.log('\n--- 3. Verifying Dark/Light SVG Favicon Support ---');
  try {
    const svgContent = fs.readFileSync('public/favicon.svg', 'utf8');
    if (svgContent.includes('prefers-color-scheme') && svgContent.includes('rx="128"')) {
      console.log(`✓ [SVG VALID] Adaptive color scheme styles and rounded squircle found`);
    } else {
      console.error(`✗ [SVG MISSING STYLES]`);
      allPass = false;
    }
  } catch (err) {
    console.error(`✗ [SVG ERROR]`, err.message);
    allPass = false;
  }

  console.log('\n--- 4. Verifying HTML Head Tags & Uniqueness ---');
  const indexRes = await testUrl(PORT, '/');
  const html = indexRes.body || '';

  const manifestTags = html.match(/<link[^>]+rel=["']manifest["'][^>]*>/gi) || [];
  if (manifestTags.length === 1) {
    console.log(`✓ [MANIFEST LINK UNIQUE] Exactly 1 manifest link found: ${manifestTags[0]}`);
  } else {
    console.error(`✗ [DUPLICATE MANIFEST] Expected 1 manifest link, found ${manifestTags.length}:`, manifestTags);
    allPass = false;
  }

  const headChecks = [
    { name: 'favicon icon link', regex: /<link[^>]+(rel=["']icon["'][^>]+href=["'][^"']*favicon\.(ico|svg)["']|href=["'][^"']*favicon\.(ico|svg)["'][^>]+rel=["']icon["'])/i },
    { name: 'apple-touch-icon link', regex: /<link[^>]+rel=["']apple-touch-icon["']/i },
    { name: 'theme-color meta', regex: /<meta[^>]+name=["']theme-color["']/i },
    { name: 'early beforeinstallprompt listener', regex: /window\.__pwaDeferredPrompt/ },
    { name: 'serviceWorker registration script', regex: /navigator\.serviceWorker\.register/ },
  ];

  for (const check of headChecks) {
    if (check.regex.test(html)) {
      console.log(`✓ [FOUND] ${check.name}`);
    } else {
      console.error(`✗ [MISSING] ${check.name}`);
      allPass = false;
    }
  }

  console.log('\n--- 5. Verifying Web App Manifest Properties ---');
  const manifestRes = await testUrl(PORT, '/manifest.webmanifest');
  try {
    const manifestObj = JSON.parse(manifestRes.body);
    const hasName = !!manifestObj.name && !!manifestObj.short_name;
    const hasDisplay = manifestObj.display === 'standalone';
    const has192 = (manifestObj.icons || []).some((i) => i.sizes === '192x192');
    const has512 = (manifestObj.icons || []).some((i) => i.sizes === '512x512');
    const hasMaskable = (manifestObj.icons || []).some((i) => i.purpose && i.purpose.includes('maskable'));
    const hasShortcuts = Array.isArray(manifestObj.shortcuts) && manifestObj.shortcuts.length >= 3;

    if (hasName && hasDisplay && has192 && has512 && hasMaskable && hasShortcuts) {
      console.log(`✓ [MANIFEST VALID] Standalone mode, 192/512/maskable icons, and ${manifestObj.shortcuts.length} shortcuts`);
    } else {
      console.error(`✗ [MANIFEST INVALID] Missing required properties:`, { hasName, hasDisplay, has192, has512, hasMaskable, hasShortcuts });
      allPass = false;
    }
  } catch (err) {
    console.error(`✗ [MANIFEST JSON ERROR]`, err.message);
    allPass = false;
  }

  console.log('\n--- 6. Verifying Service Worker Offline Setup ---');
  try {
    const swContent = fs.readFileSync('public/sw.js', 'utf8');
    const hasWebmanifestPrecache = swContent.includes('/manifest.webmanifest');
    const hasIgnoreSearch = swContent.includes('ignoreSearch');
    if (hasWebmanifestPrecache && hasIgnoreSearch) {
      console.log(`✓ [SW VALID] Pre-caches /manifest.webmanifest and handles query param navigation`);
    } else {
      console.error(`✗ [SW INCOMPLETE] Missing webmanifest precache or ignoreSearch`);
      allPass = false;
    }
  } catch (err) {
    console.error(`✗ [SW ERROR]`, err.message);
    allPass = false;
  }

  server.kill('SIGTERM');
  console.log('\nVerification complete. Result:', allPass ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED');
  process.exit(allPass ? 0 : 1);
}

run();
