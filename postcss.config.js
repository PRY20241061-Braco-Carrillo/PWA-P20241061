module.exports = {
  plugins: {
    'postcss-import': {},
    '@csstools/postcss-global-data': {
      files: [
        './themes/theme-default.css',
        './themes/theme-dark.css',
        // Añade más archivos aquí si es necesario
      ],
    },
    'tailwindcss': {},
    'autoprefixer': {},
  },
};
