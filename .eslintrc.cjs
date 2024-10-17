module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react/jsx-runtime', 'plugin:react-hooks/recommended'],

  ignorePatterns: ['dist', '.eslintrc.cjs'], // 검사하지 않을 파일 및 디렉토리 지정
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' }, // ECMAScript 버전 및 모듈 지원 설정
  settings: { react: { version: '18.2' } }, // React 버전 명시적으로 지정 (버전 통일)
  plugins: ['react-refresh', 'react', 'prettier'],

  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-no-target-blank': 'off',
    'react/prop-types': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react-refresh/only-export-components': 'off', // 모든 export 허용
  },
};
