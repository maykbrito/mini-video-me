import { PLATFORM } from 'shared/constants'

export function getDefaultStore() {
  const { IS_MAC } = PLATFORM

  return {
    language: 'default',
    theme: 'default',

    customLanguages: [
      {
        id: 'custom',
        displayName: 'Custom',

        dictionary: {
          default: 'Default',
          language: 'Language',
          topLeft: 'Top left',
          topRight: 'Top right',
          bottomLeft: 'Bottom left',
          bottomRight: 'Bottom right',
          small: 'Small',
          large: 'Large',
          settings: 'Settings',
          themes: 'Themes',
          windowSize: 'Window Size',
          screenEdge: 'Screen Edge',
          display: 'Display',
          videoInputSource: 'Video Input Source',
          close: 'Close',
          loading: 'Camera loading',
          connected: 'Camera connected',
          disconnected: 'Camera disconnected',
          notFound: 'Camera not found',
        },
      },
    ],

    customThemes: [
      {
        id: 'custom',
        displayName: 'Custom',
        textColor: '#fff',
        borderColor: 'linear-gradient(to right, #988BC7, #FF79C6)',
        borderWidth: '5px',
      },
    ],

    themeOverrides: {
      textColor: null,
      borderWidth: null,
    },

    hasShadow: true,

    camera: {
      width: 1920,
      height: 1080,
      frameRate: 60,
    },

    anchor: {
      x: 0,
      y: 0,
    },

    shortcuts: {
      moveCamera: {
        up: IS_MAC ? 'Shift+Alt+CommandOrControl+Up' : 'Shift+Alt+Up',
        down: IS_MAC ? 'Shift+Alt+CommandOrControl+Down' : 'Shift+Alt+Down',
        left: IS_MAC ? 'Shift+Alt+CommandOrControl+Left' : 'Shift+Alt+Left',
        right: IS_MAC ? 'Shift+Alt+CommandOrControl+Right' : 'Shift+Alt+Right',
      },

      resizeCamera: {
        toggle: IS_MAC ? 'Shift+Alt+CommandOrControl+1' : 'Shift+Alt+1',
      },

      hideCamera: IS_MAC ? 'Shift+Alt+CommandOrControl+2' : 'Shift+Alt+2',

      openPreferencesFile: 'CommandOrControl+,',

      adjustCameraOffset: {
        left: 'ArrowLeft',
        right: 'ArrowRight',
        up: 'ArrowUp',
        down: 'ArrowDown',
      },

      flipHorizontal: '/',
      toggleCam: 'Backspace',
      toggleWindowSize: 'Space',
      toggleShapes: 'o',
      reset: 'r',

      zoom: {
        in: '=',
        out: '-',
      },
    },

    shapes: [
      'circle(50% at 50% 50%)',
      'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
    ],

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

    zoom: 1.1,
    flipHorizontal: false,
  }
}
