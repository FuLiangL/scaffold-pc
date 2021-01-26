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
    'object-curly-newline': [ 'off' ],
    'arrow-parens': [ 'off' ],
    'linebreak-style': [ 0, 'error', 'windows' ],
    'class-methods-use-this': [ 'off', {} ],
    'import/no-mutable-exports': 0,
    'no-plusplus': [ 'error', { allowForLoopAfterthoughts: true } ],
    'space-before-function-paren': [ 'error', 'never' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    semi: [ 'error', 'never' ],
    'no-console': 'off',
    'no-debugger': 'off',
    '@typescript-eslint/no-unused-vars': [ 2, { args: 'none' } ],
    'no-param-reassign': 'error',
    'max-len': [ 'error', { code: 120 } ], // 此处为具体添加代码
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
