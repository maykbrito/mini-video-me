const { app, BrowserWindow, ipcMain} = require('electron')
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
  // Create the browser window.
  win = new BrowserWindow({
    width: customSize,
    height: customSize,
    frame: false,
    titleBarStyle: "customButtonsOnHover",
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html');

  // win.openDevTools()

  // win.on('moved', () => {
    
  // })
  
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.