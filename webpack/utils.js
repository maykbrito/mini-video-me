exports.isDev = process.env.NODE_ENV !== 'production'

exports.isModuleAvailable = (moduleName) => {
  try {
    return Boolean(require.resolve(moduleName))
  } catch {
    return false
  }
}
