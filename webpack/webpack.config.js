const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const production = require('./webpack.config.prod');
const CnameWebpackPlugin = require('cname-webpack-plugin');
const development = require('./webpack.config.dev');
const PATHS = require('./PATHS');
require('dotenv').config();

const { ENV } = process.env;
const pathsToClean = ['dist'];

const cleanOptions = {
  root: path.resolve(),
  verbose: true,
  dry: false,
};

const common = {
  entry: PATHS.APP,
  output: {
    path: PATHS.DIST,
    filename: 'app.bundle.[hash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  resolve: {
    modules: ['node_modules', PATHS.SRC],
    extensions: ['.js', '.jsx', '.json', '.scss'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [
    new CnameWebpackPlugin({
      domain: 'keyforu.net',
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/*', to: 'assets/', flatten: true },
      { from: '*.txt', to: '.', flatten: true },
    ]),
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
  ],
  optimization: {
    namedModules: true,
    splitChunks: {
      cacheGroups: {
        default: false,
        react: {
          test: /react/,
          name: 'react',
          minSize: 1,
          chunks: 'initial',
          reuseExistingChunk: true,
        },
        vendor: {
          test: /node_modules\/(?!react)/,
          name: 'vendor',
          minChunks: 2,
          minSize: 1,
          chunks: 'initial',
          reuseExistingChunk: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(txt)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              useRelativePath: true,
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg|jpeg|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000000,
              name: 'assets/[name].[ext]',
              useRelativePath: true,
            },
          },
        ],
      },
    ],
  },
};

module.exports = () => {
  console.log(ENV);
  const config = merge(common, ENV === 'DEV' ? development : production);
  return config;
};
