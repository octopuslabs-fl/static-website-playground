import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync, statSync } from 'fs';

function getExperimentEntries() {
  const experimentsDir = resolve(__dirname, 'src/experiments');
  const entries = {};
  try {
    const dirs = readdirSync(experimentsDir);
    for (const dir of dirs) {
      const fullPath = resolve(experimentsDir, dir);
      if (statSync(fullPath).isDirectory()) {
        const indexPath = resolve(fullPath, 'index.html');
        try {
          statSync(indexPath);
          entries[`experiments/${dir}`] = indexPath;
        } catch {}
      }
    }
  } catch {}
  return entries;
}

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        '404': resolve(__dirname, 'src/404.html'),
        ...getExperimentEntries(),
      },
    },
  },
});
