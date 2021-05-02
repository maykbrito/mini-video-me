const { app, BrowserWindow, ipcMain} = require('electron')
const { join } = require("path")

const isLinux = process.platform === "linux"
const isMac = process.platform === 'darwin'

const customSize = 300
const bigFactor = 2.4 // how much enlarge when double click video

let win, smallPosition, bigPosition, isLinuxWindowReadyToShow

if (isLinux) {
  app.disableHardwareAcceleration()
}

const updatePositions = {
  'big': () => {
    // memo small position
    smallPosition = win.getBounds()

    if (!bigPosition) {
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

const trayIcon = path.resolve(__dirname, 'assets', 'tray', 'trayTemplate.png');

const contextMenu = Menu.buildFromTemplate([
  {
    label: 'Mini Video Me',
    icon: trayIcon,
    enabled: false
  },
  {
    label: 'Settings',
    click() {
      return userPreferences.openInEditor()
    } 
  },
  {
    type: 'separator',
  },
  {
    type: 'normal',
    label: 'Close',
    role: 'quit',
    enabled: true,
  },
])

function createWindow () {
  mainTray = new Tray(trayIcon);

  win = new BrowserWindow({
    width: customSize,
    height: customSize,
    frame: false,
    titleBarStyle: "customButtonsOnHover",
    transparent: true,
    alwaysOnTop: true,
    maximizable: false,
    show: !isLinux,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "bridge.js"),
    }
  })

  win.loadFile('index.html')
  win.setVisibleOnAllWorkspaces(true)

  win.on("ready-to-show", () => {
    const shouldCreateNewWindowForLinux = isLinux && !isLinuxWindowReadyToShow

    if (shouldCreateNewWindowForLinux) {
      createWindow()
      
      win.show()

      isLinuxWindowReadyToShow = true
    }
  })

  isLinux && win.on("closed", app.quit)
  mainTray.setContextMenu(contextMenu)

  mainTray.on('click', mainTray.popUpContextMenu)
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})