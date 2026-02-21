import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  globalIgnores(['dist']),

  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
  },

  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/jsx-one-expression-per-line': 'off',
      '@stylistic/multiline-ternary': 'off',

      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],

      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
      '@stylistic/operator-linebreak': ['error', 'before'],
      '@stylistic/brace-style': ['error', 'stroustrup'],
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
      '@stylistic/jsx-tag-spacing': ['error', {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never',
      }],
      '@stylistic/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      '@stylistic/jsx-equals-spacing': ['error', 'never'],
      '@stylistic/jsx-closing-tag-location': 'error',
      '@stylistic/key-spacing': ['error', { beforeColon: false, afterColon: true }],
      '@stylistic/quote-props': ['error', 'consistent-as-needed'],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      '@stylistic/indent-binary-ops': ['error', 2],
    },
  },
])
