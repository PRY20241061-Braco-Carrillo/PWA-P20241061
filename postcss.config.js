module.exports = {
  plugins: {
    'postcss-import': {},
    '@csstools/postcss-global-data': {
      files: [
        './themes/theme-default.css',
        './themes/theme-dark.css',
      ],
    },
    'tailwindcss': {},
    'autoprefixer': {},
  },
};
