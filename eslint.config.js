import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import { globalIgnores } from 'eslint/config'

export default defineConfigWithVueTs(
  ...pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'vue/multi-word-component-names': 'off',
      // allow _variables
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_|Schema$',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_|Schema$',
          destructuredArrayIgnorePattern: '^_|Schema$',
          varsIgnorePattern: '^_|Schema$',
          ignoreRestSiblings: true
        }
      ]
    },
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser
      }
    }
  },
  skipFormatting,
  globalIgnores(['**/node_modules/**', '**/dist/**', '**/.git/**'])
)
