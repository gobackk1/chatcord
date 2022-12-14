module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended'
  ],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    // "no-console": "warn", // 開発中はオフ
    'object-curly-spacing': 'off',
    'no-explicit-any': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/multi-word-component-names': 'off', // ファイル名をなるべく index で書くため
    'vue/no-deprecated-slot-attribute': 'off' // Vue2でコーディングするため
  },
  ignorePatterns: [
    'webpack.config.js',
    '/test',
    'functions/lib',
    'functions/.eslintrc.js',
    '.eslintrc.js'
  ]
}
