#!/usr/bin/env node

/**
 * Setup git pre-push and pre-commit hooks for automatic version bumping on every push.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const gitDir = path.join(rootDir, '.git');
const hooksDir = path.join(gitDir, 'hooks');

if (fs.existsSync(gitDir)) {
  if (!fs.existsSync(hooksDir)) {
    fs.mkdirSync(hooksDir, { recursive: true });
  }

  // Pre-push hook script
  const prePushHook = `#!/bin/sh
# Automatically bump patch version (z) on every pushed commit
echo "⚡ [Aetheria] Running automated patch version bump before push..."
node scripts/bump-version.mjs patch

# Stage the updated package.json and lib/version.ts if in a clean state or commit
git add package.json lib/version.ts
git commit --amend --no-edit 2>/dev/null || true
`;

  const prePushPath = path.join(hooksDir, 'pre-push');
  fs.writeFileSync(prePushPath, prePushHook, { mode: 0o755 });
  console.log('✓ Configured git pre-push hook for automated version bumping.');
} else {
  console.log('ℹ .git repository not detected yet. Hook template is available in scripts/pre-push.sh');
}
