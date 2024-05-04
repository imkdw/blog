module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'node_modules/', 'dist/'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'class-methods-use-this': 'off',
    'max-len': ['error', { code: 120 }],
    'max-classes-per-file': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],

    // 변수명 좌측에 언더바 허용
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
      },
    ],

    // 클래스 변수 사이에 줄바꿈 필수 비활성
    '@typescript-eslint/lines-between-class-members': 'off',

    // no underscore dangle 비활성
    'no-underscore-dangle': 'off',
  },
};
