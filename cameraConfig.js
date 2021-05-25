const userPreferences = window.MiniVideoMe.config

console.log(userPreferences)

const config = {
  width: userPreferences.camera.width,
  height: userPreferences.camera.height,
  frameRate: userPreferences.camera.frameRate,
  flipHorizontal: userPreferences.flipHorizontal,
  rounded: userPreferences.rounded,
  scale: userPreferences.zoom,
  horizontal: String(userPreferences.anchor.x),
  vertical: String(userPreferences.anchor.y)
}

export { config }
