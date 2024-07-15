import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({ rollupTypes: true }),
  ],
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
    }
  },
  esbuild: {
    // This will do some crazy shit nobody wants:
    // https://esbuild.github.io/api/#keep-names
    // In contrast to what the documentation says, when a class is instantiated
    // it's `name` property will not be the same as in the source (aka expected)
    // but will be prefixed with an underscore. This totally blows up comparison
    // in vitest.
    // Output in app: _Person {name: 'Jane'} 'has been created'
    // keepNames: true,

    // This will disable minification of identifiers which will
    // keep the `Person` class name intact.
    // Output in app: Person {name: 'Jane'} 'has been created'
    minifyIdentifiers: false
  },
})
