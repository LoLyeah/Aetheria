#!/usr/bin/env node

/**
 * Aetheria Semantic Versioning Bumper
 * Usage:
 *   node scripts/bump-version.mjs [patch|minor|major]
 *
 * Rules:
 *   - 'patch' (z): Bumps z, resets nothing (x.y.z+1) - Default for every pushed commit
 *   - 'minor' (y): Bumps y, resets z to 0 (x.y+1.0)
 *   - 'major' (x): Bumps x, resets y and z to 0 (x+1.0.0)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const bumpType = process.argv[2] || 'patch';

if (!['patch', 'minor', 'major'].includes(bumpType)) {
  console.error(`Invalid bump type: "${bumpType}". Must be "patch", "minor", or "major".`);
  process.exit(1);
}

// 1. Read package.json
const pkgPath = path.join(rootDir, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const currentVersion = pkg.version || '1.0.0';

const [rawMajor, rawMinor, rawPatch] = currentVersion.split('.').map((n) => parseInt(n, 10) || 0);

let major = rawMajor;
let minor = rawMinor;
let patch = rawPatch;

if (bumpType === 'major') {
  major += 1;
  minor = 0;
  patch = 0;
} else if (bumpType === 'minor') {
  minor += 1;
  patch = 0;
} else {
  // patch (z)
  patch += 1;
}

const newVersion = `${major}.${minor}.${patch}`;
const today = new Date().toISOString().split('T')[0];
const buildStamp = `build.${today.replace(/-/g, '')}.${String(patch).padStart(2, '0')}`;

console.log(`\n📦 Bumping software version: ${currentVersion} -> ${newVersion} (${bumpType.toUpperCase()} update)`);

// 2. Update package.json
pkg.version = newVersion;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
console.log(`✓ Updated package.json version to ${newVersion}`);

// 3. Update lib/version.ts
const versionTsPath = path.join(rootDir, 'lib', 'version.ts');
if (fs.existsSync(versionTsPath)) {
  let content = fs.readFileSync(versionTsPath, 'utf8');

  content = content.replace(/version:\s*'[0-9.]+'/, `version: '${newVersion}'`);
  content = content.replace(/major:\s*\d+/, `major: ${major}`);
  content = content.replace(/minor:\s*\d+/, `minor: ${minor}`);
  content = content.replace(/patch:\s*\d+/, `patch: ${patch}`);
  content = content.replace(/releaseDate:\s*'[^']+'/, `releaseDate: '${today}'`);
  content = content.replace(/buildNumber:\s*'[^']+'/, `buildNumber: '${buildStamp}'`);

  fs.writeFileSync(versionTsPath, content, 'utf8');
  console.log(`✓ Synchronized lib/version.ts to ${newVersion}`);
}

console.log(`🎉 Successfully bumped to version ${newVersion}!\n`);
