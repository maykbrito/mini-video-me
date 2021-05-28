module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: require('./rules.webpack'),
  }
}
