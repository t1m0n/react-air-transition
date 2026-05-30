import { copyFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const pkgRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = resolve(pkgRoot, '../..');

// This package relies on pnpm catalogs (`catalog:` versions). Only pnpm resolves
// them to real version ranges on pack/publish; npm/yarn would publish the literal
// "catalog:" string and break every install. Refuse to pack with the wrong client.
const userAgent = process.env.npm_config_user_agent ?? '';
if (!userAgent.startsWith('pnpm')) {
  throw new Error(
    'This package must be packed/published with pnpm so that "catalog:" ' +
      'dependencies resolve to real versions. Use `pnpm publish` / `pnpm pack`.',
  );
}

// README and LICENSE live at the monorepo root, so npm/pnpm cannot pick them up
// from the package folder. Copy them in before packing so the published tarball
// has its own docs and license (cleaned up afterwards by postpack.mjs).
for (const file of ['README.md', 'LICENSE']) {
  const src = resolve(repoRoot, file);
  if (!existsSync(src)) {
    throw new Error(`Cannot publish: "${file}" is missing at the repo root (${src}).`);
  }
  copyFileSync(src, resolve(pkgRoot, file));
}
