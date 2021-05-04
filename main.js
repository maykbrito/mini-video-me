const { app, BrowserWindow, Tray, Menu, globalShortcut, screen } = require('electron')
const { ScreenController } = require('./src/lib/ScreenController')
const path = require('path')
const { userPreferences } = require('./src/store')

const isLinux = process.platform === 'linux'
const isMac = process.platform === 'darwin'

if (isLinux) {
  app.disableHardwareAcceleration()
}

/**
 * @type {BrowserWindow}
 */
let win

/**
 * @type {boolean}
 */
let isLinuxWindowReadyToShow

/**
 * @type {Tray}
 */
let mainTray

/**
 * @type {ScreenController}
 */
let screenController

const trayIcon = path.resolve(__dirname, 'assets', 'tray', 'trayTemplate.png')

/**
 * Register global shortcuts
 */
function registerShortcuts () {
  globalShortcut.register(`${userPreferences.store.shortcuts.moveCamera.up}`, () => {
    screenController.moveWindowToScreenEdge(screenController.calculateScreenMovement('top'))
  })

  globalShortcut.register(`${userPreferences.store.shortcuts.moveCamera.down}`, () => {
    screenController.moveWindowToScreenEdge(screenController.calculateScreenMovement('bottom'))
  })

  globalShortcut.register(`${userPreferences.store.shortcuts.moveCamera.left}`, () => {
    screenController.moveWindowToScreenEdge(screenController.calculateScreenMovement('left'))
  })

  globalShortcut.register(`${userPreferences.store.shortcuts.moveCamera.right}`, () => {
    screenController.moveWindowToScreenEdge(screenController.calculateScreenMovement('right'))
  })

  globalShortcut.register(`${userPreferences.store.shortcuts.resizeCamera.small}`, () => {
    screenController.setWindowSize('small')
  })

  globalShortcut.register(`${userPreferences.store.shortcuts.resizeCamera.medium}`, () => {
    screenController.setWindowSize('medium')
  })

  globalShortcut.register(`${userPreferences.store.shortcuts.resizeCamera.large}`, () => {
    screenController.setWindowSize('large')
  })

  globalShortcut.register(`${userPreferences.store.shortcuts.resizeCamera.fullscreen}`, () => {
    screenController.setWindowSize('fullscreen')
  })

  globalShortcut.register(`${userPreferences.store.shortcuts.hideCamera}`, () => {
    screenController.toggleWindowVisibility()
  })
}

async function createTrayMenu () {
  mainTray = new Tray(trayIcon)

  const availableDisplays = screen.getAllDisplays()

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Mini Video Me',
      icon: trayIcon,
      enabled: false
    },
    {
      label: 'Settings',
      click () {
        return userPreferences.openInEditor()
      }
    },
    {
      type: 'separator'
    },
    {
      type: 'submenu',
      label: 'Window size',
      submenu: [
        {
          label: 'Small',
          checked: true,
          click () {
            return screenController.setWindowSize('small')
          }
        },
        {
          label: 'Medium',
          click () {
            return screenController.setWindowSize('medium')
          }
        },
        {
          label: 'Large',
          click () {
            return screenController.setWindowSize('large')
          }
        },
        {
          label: 'Fullscreen',
          click () {
            return screenController.setWindowSize('fullscreen')
          }
        }
      ]
    },
    {
      type: 'submenu',
      label: 'Screen edge',
      submenu: [
        {
          label: 'Top left',
          click () {
            return screenController.moveWindowToScreenEdge('top-left')
          }
        },
        {
          label: 'Top right',
          click () {
            return screenController.moveWindowToScreenEdge('top-right')
          }
        },
        {
          label: 'Bottom right',
          click () {
            return screenController.moveWindowToScreenEdge('bottom-right')
          }
        },
        {
          label: 'Bottom left',
          click () {
            return screenController.moveWindowToScreenEdge('bottom-left')
          }
        }
      ]
    },
    {
      type: 'submenu',
      label: 'Display',
      submenu: availableDisplays.map(display => {
        return {
          label: `Display ${display.id} (${display.size.width}x${display.size.height})`,
          click () {
            return screenController.setActiveDisplay(display.id)
          }
        }
      })
    },
    {
      type: 'separator'
    },
    {
      type: 'normal',
      label: 'Close',
      role: 'quit',
      enabled: true
    }
  ])

  mainTray.setContextMenu(contextMenu)

  mainTray.on('click', mainTray.popUpContextMenu)
}

/**
 * Create main electron window
 */
async function createWindow () {
  win = new BrowserWindow({
    width: 300,
    height: 300,
    maxWidth: 300,
    maxHeight: 300,
    frame: false,
    titleBarStyle: 'hidden',
    transparent: true,
    alwaysOnTop: true,
    maximizable: false,
    show: !isLinux,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'bridge.js')
    }
  })

  screenController = new ScreenController(win)

  screenController.moveWindowToScreenEdge()

  win.loadFile('index.html')
  win.setVisibleOnAllWorkspaces(true)

  win.on('ready-to-show', () => {
    const shouldCreateNewWindowForLinux = isLinux && !isLinuxWindowReadyToShow

    if (shouldCreateNewWindowForLinux) {
      createWindow()

      win.show()

      isLinuxWindowReadyToShow = true
    }
  })

  isLinux && win.on('closed', app.quit)
}

app.whenReady()
  .then(registerShortcuts)
  .then(createWindow)
  .then(createTrayMenu)

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
