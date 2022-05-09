const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const { resolve } = require('path')

const { sharedOptions } = require('./shared.config')
const { isModuleAvailable } = require('./utils')
const { APP_CONFIG } = require('../app.config')

const { FOLDERS, RENDERER } = APP_CONFIG

const isSassAvailable =
  isModuleAvailable('sass') && isModuleAvailable('sass-loader')

module.exports = {
  target: 'web',

  entry: resolve(FOLDERS.ENTRY_POINTS.RENDERER),

  ...sharedOptions,

  resolve: {
    ...sharedOptions.resolve,
    alias: {
      ...sharedOptions.resolve.alias,
      react: resolve('node_modules', 'react'),
    },
  },

  devServer: {
    port: RENDERER.DEV_SERVER.URL.split(':')?.[2],
    historyApiFallback: true,
    compress: true,
    hot: true,
    client: {
      overlay: true,
    },
  },

  output: {
    path: resolve(FOLDERS.DEV_TEMP_BUILD),
    filename: 'renderer.js',
  },

  module: {
    rules: [
      ...sharedOptions.module.rules,

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      isSassAvailable && {
        test: /\.s(a|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: true },
          },
          'sass-loader',
        ],
        include: /\.module\.s(a|c)ss$/,
      },

      isSassAvailable && {
        test: /\.s(a|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /\.module\.s(a|c)ss$/,
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf|png|jpe?g|gif)$/,
        use: ['file-loader'],
      },

      {
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        loader: '@svgr/webpack',
      },
    ].filter(Boolean),
  },

  plugins: [
    ...sharedOptions.plugins,

    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve(FOLDERS.RESOURCES),
          to: resolve(FOLDERS.DEV_TEMP_BUILD, 'resources'),
        },
      ],
    }),

    new webpack.DefinePlugin({
      process: JSON.stringify({
        platform: process.platform,
      }),
    }),

    new HTMLWebpackPlugin({
      template: resolve(FOLDERS.INDEX_HTML),
    }),

    // new webpack.DefinePlugin({
    //   __REACT_DEVTOOLS_GLOBAL_HOOK__: '({ isDisabled: true })',
    // }),
  ],
}
