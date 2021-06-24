'use strict';

module.exports = {
  extends: ['eslint:recommended'],
  env: {
    es6: true,
    node: true
  },
  overrides: [
    {
      files: 'tests/**',
      env: {
        mocha: true
      },
      globals: {
        expect: true
      }
    },
    {
      files: 'tests/unit/**',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module'
      }
    }
  ]
};
