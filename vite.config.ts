import { fileURLToPath, URL } from 'node:url'
import { extname, relative, resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { globSync } from 'glob'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      !env.DOCS &&
        dts({ rollupTypes: true, include: ['src/components/ui', 'src/lib', 'src/index.ts'] })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },

    build: {
      copyPublicDir: false,
      target: 'esnext',
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        formats: ['es']
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          preserveModules: true,
          exports: 'named',
          globals: {
            vue: 'Vue'
          }
        }
      }
    }
  }
})
