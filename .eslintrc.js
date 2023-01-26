module.exports = {
  env: {
    browser: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended', 'prettier/react'],
  parser: 'babel-eslint',
  plugins: ['react-hooks'],
  rules: {
    'no-shadow': 'off', // Disabled because of Redux mapDispatchToProps
    'no-use-before-define': ['error', 'nofunc'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'jsx-a11y/anchor-is-valid': 'off', // Disabled because it doesn't work with Next.js Link components
    'global-require': 0,
  },
}
