const { ipcMain } = require('electron')

function changeWindowWithDoubleClick (screenController) {
  ipcMain.on('double-click', event => {
    const { width } = screenController.getScreenSizeInPixels()

    const size = width <= 300 ? 'large' : 'initial'

    screenController.setWindowSize(size)
  })
}

module.exports = { changeWindowWithDoubleClick }
