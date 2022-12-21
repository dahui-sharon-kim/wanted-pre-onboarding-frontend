/* eslint-disable no-nested-ternary */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
    commonjs: true,
    jest: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 6, // ES6
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    babelOptions: {
      presets: [
        ['babel-preset-react-app', false],
        process.env.NODE_ENV === 'production'
          ? 'babel-preset-react-app/prod'
          : process.env.NODE_ENV === 'test'
          ? 'babel-preset-react-app/test'
          : 'babel-preset-react-app/dev',
      ],
    },
  },
  plugins: ['prettier', 'react-hooks', 'only-warn'],
  rules: {
    'no-alert': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '_',
        argsIgnorePattern: '_',
      },
    ],
    'no-param-reassign': ['error', { ignorePropertyModificationsFor: ['draft'] }],
    'react/prefer-stateless-function': 'off',
    'react/jsx-filename-extension': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-one-expression-per-line': 'off',
    'react/prop-types': 'off',
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
        singleQuote: true, // 작은따옴표 사용하지 않음
        semi: true, // 문장의 끝에 세미콜론 표시
        useTabs: false, // tab 공백 대신 space 사용
        tabWidth: 2, // 1 tab = 2 space
        trailingComma: 'all', // 배열의 마지막 원소에 쉼표 붙임
        printWidth: 120, // 한 줄에 코드 길이 80자 이내
        arrowParens: 'avoid', // remove parentheses around a sole arrow function parameter
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'], // 해당 경로를 root path로 사용
      },
    },
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        jest: true, // now **/*.test.js files' env has both es6 *and* jest
      },
      // Can't extend in overrides: https://github.com/eslint/eslint/issues/8813
      // "extends": ["plugin:jest/recommended"]
      plugins: ['jest'],
      rules: {
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
      },
    },
  ],
};
