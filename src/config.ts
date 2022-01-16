const userPreferences = window.MiniVideoMe.config


const presetDefault = userPreferences.presets.find( preset => preset.isDefault)

const config = {
  width: Number(userPreferences.camera.width),
  height: Number(userPreferences.camera.height),
  frameRate: Number(userPreferences.camera.frameRate),
  flipHorizontal: Boolean(presetDefault.config.flipHorizontal),
  scale: Number(presetDefault.config.zoom ?? 1),
  horizontal: Number(userPreferences.anchor.x ?? 0),
  vertical: Number(userPreferences.anchor.y ?? 0),
  borderColor: presetDefault.config.borderColor,
  borderWidth: presetDefault.config.borderWidth,
  shapes: presetDefault.config.shapes,
  filters: presetDefault.config.filters,
  screenInitialWidth: presetDefault.config.screen.initial.width,
  screenInitialHeight: presetDefault.config.screen.initial.height,
  screenLargeWidth: presetDefault.config.screen.large.width,
  screenLargeHeight: presetDefault.config.screen.large.height,
}

export { config }
