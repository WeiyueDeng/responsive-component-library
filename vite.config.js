import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// vite-plugin-css-injected-by-js is used to inject scoped style and global style into js bundled.
// if use, then good for:
//  -> Easy to use: want users to include the library with minimal configuration (e.g., app.use(PNSLibrary);) without needing to separately import CSS files.
//  -> Tight Integration: Your components require scoped styles that are tightly coupled with their functionality and should not be overridden or customized directly by accessing .css.
//  -> Small or Medium-Sized Library: If the CSS size is relatively small, injecting it into the JS avoids extra HTTP requests for separate CSS files.
//  -> User Convenience: Ideal for libraries targeting developers who prefer a "plug-and-play" solution without manual asset management.
// if not use, then good for:
//  -> Customization Needs: Users might want to customize the styles by overriding your default CSS. Separate CSS files make this easier.
//  -> Large CSS Files: If your library has a significant amount of CSS, injecting it into JS increases the bundle size and may hurt performance.
//  -> Best Practices for CSS Loading: Loading CSS separately allows browsers to cache it independently of JS, improving efficiency for large projects.
//  -> Style Conflicts: In global contexts, injected CSS might interfere with users' existing styles, especially if not scoped properly.
//NOTES: if not use, to allow user import .css file in other projects, then need to:
//  -> add "style": "dist/pns-component-library.css", in package.json, 
//  -> add "style": "./dist/pns-component-library.css" under package.json's exports['.'] field
//  -> add  "./dist/pns-component-library.css": "./dist/pns-component-library.css" under package.json's exports field
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'; 

export default defineConfig({
  plugins: [
    vue(), 
    cssInjectedByJsPlugin() // if don't want to inject css in js bundle, comment this
  ],
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
