import { fileURLToPath, URL } from 'node:url'
import { extname, relative, resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { glob } from 'glob'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const rollupOptions = {
    external: [
      'vue',
      'zod',
      'vee-validate',
      '@tanstack/vue-table',
      '@vee-validate/zod',
      '@vueuse/core'
    ],
    output: {
      assetFileNames: (assetInfo) => {
        if (assetInfo.name?.endsWith('.css')) {
          return 'style.css'
        }
        return '[name][extname]'
      },
      entryFileNames: '[name].js',
      globals: {
        vue: 'Vue'
      }
    },
    input: []
  }
  if (!env.DOCS) {
    // @ts-ignore
    rollupOptions.input = Object.fromEntries(
      glob
        .sync(['src/**/*.{ts,vue,js}', 'src/lib/**/*.{ts,vue,js}', 'src/index.ts'], {
          ignore: [
            'src/components/stories/**/*',
            'src/components/__tests__/**/*',
            'src/histoire-setup.ts'
          ]
        })
        .map((file) => [
          relative('src', file.slice(0, file.length - extname(file).length)),
          fileURLToPath(new URL(file, import.meta.url))
        ])
    )
  }
  return {
    base: env.BASE_URL ?? '/',
    plugins: [
      vue(),
      !env.DOCS &&
        dts({
          // rollupTypes: true,
          include: ['src/components/ui', 'src/lib', 'src/index.ts']
        })
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
      rollupOptions
    }
  }
})
