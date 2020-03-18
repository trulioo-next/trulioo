module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('autoprefixer'),
    require('postcss-inline-svg')({
      paths: ['static/images/'],
      removeFill: true,
    }),
  ],
};
