const userPreferences = window.MiniVideoMe.config

const {
  zoom,
  theme,
  camera,
  anchor,
  shapes,
  screen,
  language,
  shortcuts,
  customThemes,
  flipHorizontal,
  customLanguages,
  themeOverrides,
} = userPreferences

export const config = {
  theme: theme || 'default',
  customThemes: customThemes || [],
  themeOverrides: themeOverrides || {},
  language: language || 'default',
  customLanguages: customLanguages || [],
  width: Number(camera.width),
  height: Number(camera.height),
  frameRate: Number(camera.frameRate),
  flipHorizontal: Boolean(flipHorizontal),
  scale: Number(zoom ?? 1),
  horizontal: Number(anchor.x ?? 0),
  vertical: Number(anchor.y ?? 0),
  shapes: shapes,
  screenInitialWidth: screen.initial.width,
  screenInitialHeight: screen.initial.height,
  screenLargeWidth: screen.large.width,
  screenLargeHeight: screen.large.height,

  shortcuts: {
    openPreferencesFile: shortcuts.openPreferencesFile,
    adjustCameraOffset: shortcuts.adjustCameraOffset,
    flipHorizontal: shortcuts.flipHorizontal,
    toggleCam: shortcuts.toggleCam,
    toggleShapes: shortcuts.toggleShapes,
    toggleWindowSize: shortcuts.toggleWindowSize,
    reset: shortcuts.reset,
    zoom: shortcuts.zoom,
  },
}
