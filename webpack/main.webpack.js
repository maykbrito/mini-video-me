const { createPackageJSONDistVersion } = require('./plugins.webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const package = require('../package.json');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },

  entry: './electron/main.ts',

  module: {
    rules: require('./rules.webpack'),
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./package.json",
          to: "../package.json",

          transform(content, path) {
            return createPackageJSONDistVersion(content)
          }
        }]
    })
  ]
}
