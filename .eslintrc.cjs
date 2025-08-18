module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'no-unused-vars': 'warn',
    'vue/no-unused-vars': 'warn',
    'vue/no-unused-components': 'warn',
    'vue/no-unused-properties': 'warn',
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    'public/',
    '*.min.js',
  ],
}
