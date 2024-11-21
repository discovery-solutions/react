import { defineConfig } from 'vite';
import { resolve } from 'path';
import packageJSON from './package.json';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: packageJSON.name,
      fileName: 'index',
    },
    rollupOptions: {
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: { },
      },
    },
  },
})