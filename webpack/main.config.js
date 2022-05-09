const { resolve } = require('path')

const { sharedOptions } = require('./shared.config')
const { APP_CONFIG } = require('../app.config')

const { FOLDERS } = APP_CONFIG

module.exports = {
  target: 'electron-main',
  externals: ['fsevents'],

  ...sharedOptions,

  entry: {
    main: resolve(FOLDERS.ENTRY_POINTS.MAIN),
    bridge: resolve(FOLDERS.ENTRY_POINTS.BRIDGE),
  },

  output: {
    path: resolve(FOLDERS.DEV_TEMP_BUILD),
    filename: '[name].js',
  },
}
