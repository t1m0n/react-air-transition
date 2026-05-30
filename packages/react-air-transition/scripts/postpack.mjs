import { rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const pkgRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Remove the copies made by prepack.mjs so the working tree stays clean.
for (const file of ['README.md', 'LICENSE']) {
  rmSync(resolve(pkgRoot, file), { force: true });
}
