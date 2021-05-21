const { ipcMain } = require('electron')

function doubleClick (win) {
  let smallPosition = win.getBounds()
  let bigPosition
  const customSize = 300
  const bigFactor = 2 // how much enlarge when double click video
  const proportion = customSize * bigFactor

  win.setMaximumSize(proportion, proportion)

  const updatePositions = {
    big: () => {
      // memo small position
      smallPosition = win.getBounds()

      if (!bigPosition) {
        // first time enter, configure big video
        const { x, y } = smallPosition
        bigPosition = {
          x: x - proportion,
          y: y - proportion,
          width: proportion,
          height: proportion
        }
      }

      // move and make it bigger
      win.setBounds(bigPosition, true)
    },
    small: () => {
      // memo big position
      bigPosition = win.getBounds()

      // move and make it smaller
      win.setBounds(smallPosition, true)
    }
  }

  ipcMain.on('double-click', (event, arg) => {
    const size = arg ? 'small' : 'big'
    updatePositions[size]()
  })
}

module.exports = { doubleClick }
