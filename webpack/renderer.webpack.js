module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.css'],
  },
  module: {
    rules: require('./rules.webpack'),
  },
}
