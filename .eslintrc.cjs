/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  'root': true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended'
  ],
  'env': {
    'vue/setup-compiler-macros': true
  },
  rules: {
    'eol-last': ['error', 'always'],
    'semi': 'error',
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    'vue/html-quotes': [ 'error', 'double', { 'avoidEscape': true }],
    '@typescript-eslint/no-non-null-assertion': 'off'
  },
};
