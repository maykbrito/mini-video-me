const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const { resolve } = require('path')

const { isDev } = require('./utils')

exports.sharedOptions = {
  mode: process.env.NODE_ENV || 'development',

  stats: 'minimal',

  devtool: isDev ? 'eval-source-map' : 'source-map',

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],

    alias: {
      '~': resolve(),
    },

    plugins: [new TsconfigPathsPlugin({})],
  },

  optimization: {
    usedExports: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|ts|tsx|jsx)$/,
        loader: 'swc-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [new SimpleProgressWebpackPlugin({ format: 'minimal' })],
}
