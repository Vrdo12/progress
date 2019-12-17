const path = require('path');

module.exports = {
  SRC: path.resolve('client'),
  DIST: path.resolve('dist'),
  APP: path.resolve('client/src/index'),
  TEMPLATE: path.resolve('webpack/template.html'),
  TEMPLATE_404: path.resolve('webpack/404.html'),
  POSTCSS: path.resolve('postcss.config.js'),
};
