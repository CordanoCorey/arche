import nx from '@nx/eslint-plugin';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import { qwikEslint9Plugin } from 'eslint-plugin-qwik';

const ignores = [
  '**/*.log',
  '**/.DS_Store',
  '**/.history',
  '**/.yarn',
  '**/bazel-*',
  '**/bazel-bin',
  '**/bazel-out',
  '**/bazel-qwik',
  '**/bazel-testlogs',
  '**/dist',
  '**/dist-dev',
  '**/lib',
  '**/lib-types',
  '**/etc',
  '**/external',
  '**/node_modules',
  '**/temp',
  '**/tsc-out',
  '**/tsdoc-metadata.json',
  '**/target',
  '**/output',
  '**/rollup.config.js',
  '**/build',
  '**/.cache',
  '**/.vscode',
  '**/.rollup.cache',
  '**/tsconfig.tsbuildinfo',
  '**/*.spec.tsx',
  '**/*.spec.ts',
  '**/.netlify',
  '**/pnpm-lock.yaml',
  '**/package-lock.json',
  '**/yarn.lock',
  '**/server',
  '**/vite.config.*',
  '**/vitest.config.*',
  'eslint.config.js',
];

export default [
  globalIgnores(ignores),

  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  js.configs.recommended,
  tseslint.configs.recommended,
  qwikEslint9Plugin.configs.recommended,

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        ...globals.serviceworker,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
];
