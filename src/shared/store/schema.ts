import { JSONSchemaType } from 'json-schema-typed'
import { Schema } from 'electron-store'

import { getDefaultStore } from './default'

const defaultStore = getDefaultStore()

export const userPreferencesSchema: Schema<typeof defaultStore> = {
  language: {
    type: JSONSchemaType.String,
  },

  theme: {
    type: JSONSchemaType.String,
  },

  customLanguages: {
    type: JSONSchemaType.Array,
    items: {
      type: JSONSchemaType.Object,
    },
  },

  customThemes: {
    type: JSONSchemaType.Array,
    items: {
      type: JSONSchemaType.Object,
    },
  },

  themeOverrides: {
    type: JSONSchemaType.Object,
  },

  hasShadow: {
    type: JSONSchemaType.Boolean,
  },

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

  flipHorizontal: {
    type: JSONSchemaType.Boolean,
  },

  zoom: {
    type: JSONSchemaType.Number,
  },
}
