import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  return {
    build: {
      // A delay here is needed so that the library has time to finish building
      // before app's vite will pick up the changes. A second is quite conservative
      // delay, usually it takes much less than that.
      watch: mode === 'development' ? { buildDelay: 1000 } : undefined,
    },
  }
})
