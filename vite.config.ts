import { fileURLToPath, URL } from 'node:url'
import { extname, relative, resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { glob } from 'glob'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      !env.DOCS && dts({ rollupTypes: true, include: ['src/components/ui', 'src/lib'] })
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
        input: Object.fromEntries(
          glob
            .sync([
              'src/components/ui/**/*.{ts,vue}',
              'src/lib/**/*.{ts}',
              'src/tailwind-preset.ts'
            ])
            .map((file) => [
              relative('src', file.slice(0, file.length - extname(file).length)),
              fileURLToPath(new URL(file, import.meta.url))
            ])
        ),
        external: ['vue'],
        output: {
          assetFileNames: 'assets/[name][extname]',
          entryFileNames: '[name].js',
          globals: {
            vue: 'Vue'
          }
        }
      }
    }
  }
})
