import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  base: "/game-of-life-vite-solidjs/",
  plugins: [solid()],
})
