import { fileURLToPath, URL } from 'node:url'
import { extname, relative, resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { glob } from 'glob'
import { splitVendorChunkPlugin } from 'vite'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      !env.DOCS &&
        dts({
          // rollupTypes: true,
          include: ['src/components/ui', 'src/lib', 'src/index.ts']
        }),
      splitVendorChunkPlugin()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },

    build: {
      copyPublicDir: false,
      cssCodeSplit: true,
      target: 'esnext',
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        formats: ['es']
      },
      rollupOptions: {
        external: ['vue'],
        input: Object.fromEntries(
          glob
            .sync(
              [
                'src/**/*.{ts,vue,js}',
                'src/lib/**/*.{ts,vue,js}',
                'src/index.ts',
                'src/assets/main.css'
              ],
              {
                ignore: [
                  'src/components/stories/**/*',
                  'src/components/__tests__/**/*',
                  'src/histoire-setup.ts'
                ]
              }
            )
            .map((file) => [
              relative('src', file.slice(0, file.length - extname(file).length)),
              fileURLToPath(new URL(file, import.meta.url))
            ])
        ),
        output: {
          assetFileNames: '[name][extname]',
          entryFileNames: '[name].js',
          globals: {
            vue: 'Vue'
          }
        }
      }
    }
  }
})
