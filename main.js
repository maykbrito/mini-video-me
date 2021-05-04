const { app, BrowserWindow, Tray, Menu, globalShortcut, screen } = require('electron')
const path = require('path')
const { userPreferences } = require('./src/store')

const isLinux = process.platform === "linux"
const isMac = process.platform === 'darwin'

if (isLinux) {
  app.disableHardwareAcceleration()
}

/**
 * @type {number}
 */
let windowSizeInPixels = 300

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
 * @type {'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'}
 */
let currentScreenEdge = 'bottom-right'

const trayIcon = path.resolve(__dirname, 'assets', 'tray', 'trayTemplate.png')

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
    type: 'normal',
    label: 'Close',
    role: 'quit',
    enabled: true
  }
])

/**
 * Set window size
 * @param {Number} size
 */
function setWindowSize (size) {
  windowSizeInPixels = 200 + (size * 100)

  win.setMaximumSize(windowSizeInPixels, windowSizeInPixels)

  moveWindowToScreenEdge(currentScreenEdge)

  win.setSize(windowSizeInPixels, windowSizeInPixels)
}

/**
 * Calculate screen movement on edges
 * @param {'left' | 'right' | 'top' | 'bottom'} movement
 */
function calculateScreenMovement (movement) {
  const edgeMovements = {
    'top-right': {
      left: 'top-left',
      bottom: 'bottom-right'
    },
    'top-left': {
      right: 'top-right',
      bottom: 'bottom-left'
    },
    'bottom-right': {
      left: 'bottom-left',
      top: 'top-right'
    },
    'bottom-left': {
      right: 'bottom-right',
      top: 'top-left'
    }
  }

  return edgeMovements[currentScreenEdge][movement] || currentScreenEdge
}

/**
 * Move window to screen edge
 * @param {'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'} edge
 */
function moveWindowToScreenEdge (edge) {
  /**
   * Get the screen behind electron window
   */

  currentScreenEdge = edge

  const { x, y } = win.getBounds()
  const display = screen.getDisplayNearestPoint({ x, y })

  const bounds = { x: display.bounds.x, y: display.bounds.y }

  switch (edge) {
    case 'top-left':
      bounds.x += 24
      bounds.y += 24
      break
    case 'bottom-left':
      bounds.x += 24
      bounds.y += display.size.height - windowSizeInPixels - 24
      break
    case 'top-right':
      bounds.x += display.size.width - windowSizeInPixels - 24
      bounds.y += 24
      break
    case 'bottom-right':
      bounds.x += display.size.width - windowSizeInPixels - 24
      bounds.y += display.size.height - windowSizeInPixels - 24
      break
  }

  win.setBounds(bounds)
}

/**
 * Register global shortcuts
 */
function registerShortcuts () {
  const availableScreenSizes = [1, 2, 3, 4] // 300, 400, 500, 600

  const availableMovementCommands = {
    left: 'Left',
    right: 'Right',
    top: 'Up',
    bottom: 'Down'
  }

  availableScreenSizes.forEach(size => {
    globalShortcut.register(`${userPreferences.store.shortcuts.resizeCamera}+${size}`, () => {
      setWindowSize(size)
    })
  })

  Object.entries(availableMovementCommands).forEach(([command, shortcut]) => {
    globalShortcut.register(`${userPreferences.store.shortcuts.moveBetweenEdges}+${shortcut}`, () => {
      const edge = calculateScreenMovement(command)

      moveWindowToScreenEdge(edge)
    })
  })
}

async function createTrayMenu() {
  mainTray = new Tray(trayIcon)

  mainTray.setContextMenu(contextMenu)

  mainTray.on('click', mainTray.popUpContextMenu)
}

/**
 * Create main electron window
 */
async function createWindow () {
  win = new BrowserWindow({
    width: windowSizeInPixels,
    height: windowSizeInPixels,
    maxWidth: windowSizeInPixels,
    maxHeight: windowSizeInPixels,
    frame: false,
    titleBarStyle: 'customButtonsOnHover',
    transparent: true,
    alwaysOnTop: true,
    maximizable: false,
    show: !isLinux,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "bridge.js"),
    }
  })

  moveWindowToScreenEdge(currentScreenEdge)

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
