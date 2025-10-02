/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path, { extname, relative, resolve } from 'node:path'
import dts from 'vite-plugin-dts'
import { glob } from 'glob'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
import { fileURLToPath } from 'node:url'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

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
    assetFileNames: (assetInfo: { name: string | undefined }) => {
      if (assetInfo.name?.endsWith('.css')) {
        return 'style.css'
      }
      return '[name][extname]'
    },
    entryFileNames: '[name].js',
    globals: { vue: 'Vue' }
  },
  input: []
}

// @ts-ignore
rollupOptions.input = Object.fromEntries(
  glob
    .sync(['src/**/*.{ts,vue,js}', 'src/lib/**/*.{ts,vue,js}', 'src/index.ts'], {
      ignore: ['src/stories/**/*']
    })
    .map((file) => [
      relative('src', file.slice(0, file.length - extname(file).length)),
      fileURLToPath(new URL(file, import.meta.url))
    ])
)

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: ['src/stories/**/*', 'src/**/*.stories.*'],
      insertTypesEntry: true,
      copyDtsFiles: true,
      entryRoot: 'src',
      tsconfigPath: './tsconfig.app.json'
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'src/theme.css',
          dest: '' // или оставьте пустым для корневой директории
        }
      ]
    })
  ],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, '.storybook') })
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }]
          },
          setupFiles: ['.storybook/vitest.setup.ts']
        }
      }
    ]
  },
  build: {
    copyPublicDir: false,
    target: 'esnext',
    lib: { entry: resolve(__dirname, 'src/index.ts'), formats: ['es'] },
    rollupOptions
  }
})
