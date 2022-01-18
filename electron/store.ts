import electron from 'electron'
import Store, { Schema } from 'electron-store'
import chokidar from 'chokidar'
import { JSONSchemaType } from 'json-schema-typed'

const userPreferencesSchema: Schema<unknown> = {
  camera: {
    type: JSONSchemaType.Object,
    properties: {
      width: {
        type: JSONSchemaType.Number,
      },
      height: {
        type: JSONSchemaType.Number,
      },
      frameRate: {
        type: JSONSchemaType.Number,
      },
    },
  },
  anchor: {
    type: JSONSchemaType.Object,
    properties: {
      x: {
        type: JSONSchemaType.Number,
      },
      y: {
        type: JSONSchemaType.Number,
      },
    },
  },
  shortcuts: {
    type: JSONSchemaType.Object,
    properties: {
      moveCamera: {
        type: JSONSchemaType.Object,
        properties: {
          up: {
            type: JSONSchemaType.String,
          },
          down: {
            type: JSONSchemaType.String,
          },
          left: {
            type: JSONSchemaType.String,
          },
          right: {
            type: JSONSchemaType.String,
          },
        },
      },
      resizeCamera: {
        type: JSONSchemaType.Object,
        properties: {
          initial: {
            type: JSONSchemaType.String,
          },
          large: {
            type: JSONSchemaType.String,
          },
        },
      },
      hideCamera: {
        type: JSONSchemaType.String,
      },
    },
  },
  presets: {
    type: JSONSchemaType.Array,
    items: {
      type: JSONSchemaType.Object,
      properties: {
        name: {
          type: JSONSchemaType.String,
        },
        isDefault: {
          type: JSONSchemaType.Boolean,
        },
        config: {
          type: JSONSchemaType.Object,
          properties: {
            zoom: {
              type: JSONSchemaType.Number,
            },
            flipHorizontal: {
              type: JSONSchemaType.Boolean,
            },
            borderWidth: {
              type: JSONSchemaType.String,
            },
            borderColor: {
              type: JSONSchemaType.String,
            },
            filters: {
              type: JSONSchemaType.Array,
              items: {
                type: JSONSchemaType.String,
              },
            },
            screen: {
              type: JSONSchemaType.Object,
              properties: {
                initial: {
                  type: JSONSchemaType.Object,
                  properties: {
                    width: {
                      type: JSONSchemaType.Number,
                    },
                    height: {
                      type: JSONSchemaType.Number,
                    },
                  },
                },
                large: {
                  type: JSONSchemaType.Object,
                  properties: {
                    width: {
                      type: JSONSchemaType.Number,
                    },
                    height: {
                      type: JSONSchemaType.Number,
                    },
                  },
                },
              },
            },
            shapes: {
              type: JSONSchemaType.Array,
              items: {
                type: JSONSchemaType.String,
              },
            },
          },
        },
      },
    },
  },
}

export const userPreferences = new Store({
  schema: userPreferencesSchema,
  watch: true,
  clearInvalidConfig: true,
  defaults: {
    camera: {
      width: 1920,
      height: 1080,
      frameRate: 59.94,
    },
    anchor: {
      x: 0,
      y: 0,
    },
    shortcuts: {
      moveCamera: {
        up: 'Shift+Alt+CommandOrControl+Up',
        down: 'Shift+Alt+CommandOrControl+Down',
        left: 'Shift+Alt+CommandOrControl+Left',
        right: 'Shift+Alt+CommandOrControl+Right',
      },
      resizeCamera: {
        initial: 'Shift+Alt+CommandOrControl+1',
        large: 'Shift+Alt+CommandOrControl+2',
      },
      hideCamera: 'Shift+Alt+CommandOrControl+3',
    },
    presets: [
      {
        name: 'base',
        isDefault: true,
        config: {
          zoom: 1,
          flipHorizontal: false,
          borderWidth: '5px',
          borderColor: 'linear-gradient(to right, #988BC7, #FF79C6)',
          filters: ['initial', 'grayscale(1)'],
          screen: {
            initial: {
              width: 300,
              height: 300,
            },
            large: {
              width: 600,
              height: 600,
            },
          },
          shapes: ['circle(50% at 50% 50%)'],
        },
      },
    ],
  },
})

chokidar.watch(userPreferences.path).on('change', () => {
  electron.app.relaunch()
  electron.app.exit()
})
