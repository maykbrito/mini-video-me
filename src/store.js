const electron = require('electron')
const Store = require('electron-store')
const chokidar = require('chokidar')
const { JSONSchemaType } = require('json-schema-typed')

/**
 * @type {Store.Schema}
 */
const userPreferencesSchema = {
  camera: {
    type: JSONSchemaType.Object,
    properties: {
      width: {
        type: JSONSchemaType.Number
      },
      height: {
        type: JSONSchemaType.Number
      },
      frameRate: {
        type: JSONSchemaType.Number
      }
    }
  },
  anchor: {
    type: JSONSchemaType.Object,
    properties: {
      x: {
        type: JSONSchemaType.Number
      },
      y: {
        type: JSONSchemaType.Number
      }
    }
  },
  shortcuts: {
    type: JSONSchemaType.Object,
    properties: {
      moveBetweenEdges: {
        type: JSONSchemaType.String
      },
      resizeCamera: {
        type: JSONSchemaType.String
      }
    }
  },
  rounded: {
    type: JSONSchemaType.Boolean
  },
  flipHorizontal: {
    type: JSONSchemaType.Boolean
  },
  zoom: {
    type: JSONSchemaType.Number
  }
}

const userPreferences = new Store({
  schema: userPreferencesSchema,
  watch: true,
  defaults: {
    camera: {
      width: 1920,
      height: 1080,
      frameRate: 59.94
    },
    anchor: {
      x: 0,
      y: 0
    },
    shortcuts: {
      moveBetweenEdges: 'Shift+Alt+CommandOrControl',
      resizeCamera: 'Shift+Alt+CommandOrControl'
    },
    rounded: true,
    flipHorizontal: false,
    zoom: 1.1
  }
})

chokidar.watch(userPreferences.path).on('change', () => {
  electron.app.relaunch()
  electron.app.exit()
})

module.exports = { userPreferences }
