const eslintRecommended = require('eslint/conf/eslint-recommended');
const tsRecommended = require('@typescript-eslint/eslint-plugin/dist/configs/recommended');
const parser = require('@typescript-eslint/parser');

module.exports = [
  eslintRecommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    extends: [
      'plugin:@typescript-eslint/recommended',
    ],
    rules: {
      // Add any specific rules here
    },
  },
];
