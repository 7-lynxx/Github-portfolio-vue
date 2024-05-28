import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dotenv from 'dotenv'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vitejs.dev/config/

dotenv.config()
export default defineConfig({
  plugins: [
    vue({
      template: {transformAssetUrls}
    }),
    quasar({
     
    })

  ]
})
