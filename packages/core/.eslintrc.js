module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [ 'plugin:vue/essential', '@vue/airbnb', '@vue/typescript' ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'linebreak-style': [ 0, 'error', 'windows' ],
    'class-methods-use-this': [ 'off', {} ],
    'import/no-mutable-exports': 0,
    'no-plusplus': [ 'error', { allowForLoopAfterthoughts: true } ],
    'space-before-function-paren': [ 'error', 'always' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    semi: [ 'error', 'never' ],
    'no-console': 'off',
    'no-debugger': 'off',
    '@typescript-eslint/no-unused-vars': [
      2,
      { args: 'none' },
    ],
    'no-param-reassign': 'error',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          [ '@', './src/' ],
          [ '@assets', './src/assets/' ],
          [ '@components', './src/components/' ],
          [ '@views', './src/views/' ],
          [ '@common', './src/common/' ],
        ],
      },
    },
  },
  overrides: [
    {
      files: [ '**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)' ],
      env: {
        mocha: true,
      },
    },
  ],
}
