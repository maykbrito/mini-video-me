const { userPreferences } = require('./src/store')

const store = userPreferences.store;

const config = {
  width: store.camera.width,
  height: store.camera.height,
  frameRate: store.camera.frameRate,
  flipHorizontal: store.flipHorizontal,
  rounded: store.rounded,
  scale: store.zoom,
  horizontal: String(store.anchor.x),
  vertical: String(store.anchor.y),
}

export { config };
