import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',  // Map '@' to '/src' directory
    },
  },
  build: {
    lib: {
      entry: './src/index.js',   // Entry file for your library
      name: 'PNSComponentLibrary',        // The name of your library (used when imported)
      // Output file name (based on format): cjs -> CommonJS, es -> ES module, umd -> UMD
      // matched with export and entry-point in package.json
      fileName: (format) => `pns-component-library.${format}.js`, 
    },
    rollupOptions: {
      // Make sure to externalize dependencies that should not be bundled
      external: ['vue'],  // E.g., Vue is externalized because the user will provide their own Vue
      output: {
        globals: {
          vue: 'Vue',  // This is the global variable name for Vue when externalized
        },
        // Create multiple builds (e.g., ESM, CJS, UMD)
        formats: ['es', 'cjs', 'umd'],
        dir: 'dist',  // Output directory
      },
    },
  },
})
