const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 1. Standard App Icon SVG (rounded squircle background matching Navbar w-8 h-8 rounded-lg)
// In Tailwind, rounded-lg on 32px is 8px (25%). On 512px, 25% is rx=128.
// Lucide Atom paths centered at 50% scale (256x256 inside 512x512).
const appIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="128" fill="#0f172a" />
  <g transform="translate(128, 128) scale(10.666667)" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <circle cx="12" cy="12" r="1.2" fill="#ffffff" stroke="#ffffff" stroke-width="0.8" />
    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
  </g>
</svg>`;

// 2. Favicon SVG with Dark/Light Scheme Support (matching Navbar dark:bg-slate-100 dark:text-slate-900)
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <style>
    .bg { fill: #0f172a; }
    .fg { stroke: #ffffff; }
    .core { fill: #ffffff; stroke: #ffffff; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: #f8fafc; }
      .fg { stroke: #0f172a; }
      .core { fill: #0f172a; stroke: #0f172a; }
    }
  </style>
  <rect width="512" height="512" rx="128" class="bg" />
  <g transform="translate(128, 128) scale(10.666667)" class="fg" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <circle cx="12" cy="12" r="1.2" class="core" stroke-width="0.8" />
    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
  </g>
</svg>`;

// 3. Full-bleed Maskable / Apple Touch Icon SVG (square #0f172a, atom in safe center 50%)
const maskableIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="#0f172a" />
  <g transform="translate(128, 128) scale(10.666667)" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <circle cx="12" cy="12" r="1.2" fill="#ffffff" stroke="#ffffff" stroke-width="0.8" />
    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
  </g>
</svg>`;

/**
 * Pure Node.js multi-size ICO generator from PNG buffers.
 * Avoids any external Python dependency or /tmp directory access.
 */
function createIco(pngEntries) {
  const count = pngEntries.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // 1 = ICO type
  header.writeUInt16LE(count, 4); // Number of images

  let offset = 6 + 16 * count;
  const entries = [];
  for (const { width, height, buffer } of pngEntries) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(width >= 256 ? 0 : width, 0);
    entry.writeUInt8(height >= 256 ? 0 : height, 1);
    entry.writeUInt8(0, 2); // Color count
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // Size of image data
    entry.writeUInt32LE(offset, 12); // Offset of image data
    entries.push(entry);
    offset += buffer.length;
  }
  return Buffer.concat([header, ...entries, ...pngEntries.map((e) => e.buffer)]);
}

async function generate() {
  const publicDir = path.join(__dirname, '..', 'public');
  const appDir = path.join(__dirname, '..', 'app');

  // 1. Save SVGs
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), appIconSvg);
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg);
  fs.writeFileSync(path.join(appDir, 'icon.svg'), appIconSvg);

  const svgBuffer = Buffer.from(appIconSvg);
  const maskableSvgBuffer = Buffer.from(maskableIconSvg);

  // 2. Generate PNGs in public
  await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'icon-512.png'));
  await sharp(svgBuffer).resize(192, 192).png().toFile(path.join(publicDir, 'icon-192.png'));
  await sharp(maskableSvgBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'icon-maskable-512.png'));
  await sharp(maskableSvgBuffer).resize(192, 192).png().toFile(path.join(publicDir, 'icon-maskable-192.png'));
  await sharp(maskableSvgBuffer).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));

  // 3. Also in appDir for Next.js convention
  await sharp(maskableSvgBuffer).resize(180, 180).png().toFile(path.join(appDir, 'apple-icon.png'));

  // 4. Generate multi-resolution favicon.ico in memory (16x16, 32x32, 48x48)
  const b16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const b32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const b48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();

  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: b16 },
    { width: 32, height: 32, buffer: b32 },
    { width: 48, height: 48, buffer: b48 },
  ]);

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);

  console.log('All icons generated successfully with multi-resolution ICO (16x16, 32x32, 48x48)!');
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
