module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.tsx']
  },
  module: {
    rules: require('./rules.webpack'),
  }
}
