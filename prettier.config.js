module.exports = {
  endOfLine: 'lf',
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  overrides: [
    {
      files: '*.?(s)css',
      options: {
        singleQuote: false,
      },
    },
  ],
}
