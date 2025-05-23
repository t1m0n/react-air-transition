import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import importEsPlugin from 'eslint-plugin-import';
import preferArrow from 'eslint-plugin-prefer-arrow';
import esPluginReact from 'eslint-plugin-react';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'prefer-arrow': preferArrow,
      react: esPluginReact,
      import: importEsPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./packages/react-air-transition/tsconfig.app.json'],
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // common
      'max-lines': ['error', { max: 300 }],
      'max-len': [
        'error',
        100,
        2,
        {
          ignoreUrls: true,
          ignoreComments: false,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      'max-params': ['error', { max: 2 }],
      'no-shadow': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],

      // import
      'import/no-unresolved': 'error',
      'import/no-cycle': 'error',
      'import/no-default-export': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        },
      ],

      //prefer-arrow
      'prefer-arrow/prefer-arrow-functions': [
        'error',
        {
          disallowPrototype: true,
          singleReturnOnly: false,
          classPropertiesAllowed: false,
        },
      ],

      //react
      'react/jsx-curly-brace-presence': 'error',

      //typescript
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
          vars: 'all',
          args: 'after-used',
          caughtErrors: 'none',
        },
      ],
    },
  },
  eslintConfigPrettier,
);
