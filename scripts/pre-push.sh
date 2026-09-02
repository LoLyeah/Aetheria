#!/bin/sh
# Automatically bump patch version (z) on every pushed commit
echo "⚡ [Aetheria] Running automated patch version bump before push..."
node scripts/bump-version.mjs patch
git add package.json lib/version.ts
