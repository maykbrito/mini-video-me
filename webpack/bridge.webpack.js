const path = require('path')

const rootPath = path.resolve(__dirname, '..')

module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: {
    main: path.resolve(rootPath, 'electron', 'bridge.ts')
  },
  target: 'electron-preload',
  output: {
    path: path.resolve(rootPath, 'dist/electron'),
    filename: 'bridge.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  node: {
    __dirname: true
  }
}
