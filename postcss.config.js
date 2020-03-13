module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-inline-svg')({
      paths: ['static/images/'],
      removeFill: true,
    }),
  ],
};
