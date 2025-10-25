module.exports = {
  extends: ['next/core-web-vitals', 'next/typescript'],
  overrides: [
    {
      files: ['tailwind.config.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        'no-undef': 'off', // Allow require() function
      },
    },
  ],
}
