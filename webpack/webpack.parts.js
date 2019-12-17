/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

/* eslint-enable */
require('dotenv').config();

const { TITLE } = process.env;

const PATHS = require('./PATHS');

exports.setMode = mode => ({
  mode,
});

exports.sourceMaps = method => ({
  devtool: method,
});

exports.buildSetup = env => {
  env = 'production';
  return {
    plugins: [
      new HtmlWebpackPlugin({
        template: PATHS.TEMPLATE,
        filename: 'index.html',
        title: TITLE,
        inject: 'body',
        minify:
          env === 'development'
            ? false
            : {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                html5: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
      }),
      new HtmlWebpackPlugin({
        filename: '404.html',
        template: PATHS.TEMPLATE_404,
      }),
      // http://localhost:5000/
      new BaseHrefWebpackPlugin({
        baseHref:
          env === 'development'
            ? 'http://localhost:5000/'
            : 'https://keyforu.net/',
      }),
      new FaviconsWebpackPlugin('favicon.png'),
    ],
  };
};

exports.extractLess = new ExtractTextPlugin({
  filename: 'style.[hash].css',
});

exports.styleLoader = options => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: options.use,
      },
    ],
  },
});
