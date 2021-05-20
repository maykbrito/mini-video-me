const { app, BrowserWindow, ipcMain} = require('electron')
const { join } = require("path")
const customSize = 300
const bigFactor = 2.4 // how much enlarge when double click video
let win, smallPosition, bigPosition

const updatePositions = {
  'big': () => {
    // memo small position
    smallPosition = win.getBounds()

    if(!bigPosition) {
      // first time enter, configure big video
      const { x, y } = smallPosition
      const proportion = customSize * bigFactor
      bigPosition = {x: x - proportion, y: y - proportion, width: proportion, height: proportion}
    }

    // move and make it bigger
    win.setBounds(bigPosition, true)
  },
  'small': () => {
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

function createWindow () {
  win = new BrowserWindow({
    width: customSize,
    height: customSize,
    frame: false,
    titleBarStyle: "customButtonsOnHover",
    transparent: true,
    alwaysOnTop: true,
    maximizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "bridge.js"),
    }
  })

  win.loadFile('index.html');
  win.setVisibleOnAllWorkspaces(true)

}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})