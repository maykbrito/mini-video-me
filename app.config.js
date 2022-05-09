const {
  devServer,
  devTempBuildFolder,
  name: NAME,
  author: AUTHOR,
  version: VERSION,
  displayName: TITLE,
  description: DESCRIPTION,
} = require('./package.json')

exports.APP_CONFIG = {
  NAME,
  TITLE,
  AUTHOR,
  VERSION,
  DESCRIPTION,

  MAIN: {
    WINDOW: {
      WIDTH: 700,
      HEIGHT: 473,
    },
  },

  RENDERER: {
    DEV_SERVER: {
      URL: devServer,
    },
  },

  FOLDERS: {
    ENTRY_POINTS: {
      MAIN: './src/main/index.ts',
      BRIDGE: './src/renderer/bridge/index.ts',
      RENDERER: './src/renderer/index.tsx',
    },

    INDEX_HTML: 'src/renderer/index.html',
    RESOURCES: 'src/resources',
    DEV_TEMP_BUILD: devTempBuildFolder,
  },
}
