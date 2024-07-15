import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    watch: {
      // A delay here is needed so that the library has time to finish building
      // before app's vite will pick up the changes. A second is quite conservative
      // delay, usually it takes much less than that.
      buildDelay: 1000,
    },
  },
})
