import {
  app,
  BrowserWindow,
  Tray,
  Menu,
  globalShortcut,
  screen,
  nativeImage,
  ipcMain,
} from 'electron'
import path from 'path'

import { ScreenController } from './lib/ScreenController'
import { VideoDevice } from './bridge'
import { userPreferences } from './store'

const isLinux = process.platform === 'linux'
const isMac = process.platform === 'darwin'

const assetsPath =
  process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : app.getAppPath()

if (isLinux) {
  app.disableHardwareAcceleration()
}

if (isMac) {
  app.dock.hide()
}

let win: BrowserWindow
let isLinuxWindowReadyToShow: boolean
let mainTray: Tray
let screenController: ScreenController
let videoInputDevices: VideoDevice[]

const trayIcon = path.join(assetsPath, 'assets', 'tray', 'trayTemplate.png')

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

/**
 * Register global shortcuts
 */
function registerShortcuts() {
  screenController = new ScreenController(win)

  screenController.moveWindowToScreenEdge()

  globalShortcut.register(
    `${userPreferences.store.shortcuts.moveCamera.up}`,
    () => {
      screenController.moveWindowToScreenEdge(
        screenController.calculateScreenMovement('top')
      )
    }
  )

  globalShortcut.register(
    `${userPreferences.store.shortcuts.moveCamera.down}`,
    () => {
      screenController.moveWindowToScreenEdge(
        screenController.calculateScreenMovement('bottom')
      )
    }
  )

  globalShortcut.register(
    `${userPreferences.store.shortcuts.moveCamera.left}`,
    () => {
      screenController.moveWindowToScreenEdge(
        screenController.calculateScreenMovement('left')
      )
    }
  )

  globalShortcut.register(
    `${userPreferences.store.shortcuts.moveCamera.right}`,
    () => {
      screenController.moveWindowToScreenEdge(
        screenController.calculateScreenMovement('right')
      )
    }
  )

  globalShortcut.register(
    `${userPreferences.store.shortcuts.resizeCamera.initial}`,
    () => {
      screenController.setWindowSize('initial')
    }
  )

  globalShortcut.register(
    `${userPreferences.store.shortcuts.resizeCamera.large}`,
    () => {
      screenController.setWindowSize('large')
    }
  )

  globalShortcut.register(
    `${userPreferences.store.shortcuts.hideCamera}`,
    () => {
      screenController.toggleWindowVisibility()
    }
  )

  if (isMac) {
    ipcMain.on('double-click', () => {
      screenController.toggleWindowSize()
    })
  }
}

async function createTrayMenu() {
  mainTray = new Tray(trayIcon)

  mainTray.setToolTip('Mini Video Me')

  mainTray.on('click', () => mainTray.popUpContextMenu())

  createTrayContextMenu()
}

async function createTrayContextMenu() {
  const availableDisplays = screen.getAllDisplays()

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Mini Video Me',
      icon: trayIcon,
      enabled: false,
    },
    {
      label: 'Settings',
      click() {
        return userPreferences.openInEditor()
      },
    },
    {
      type: 'separator',
    },
    {
      type: 'submenu',
      label: 'Window size',
      submenu: [
        {
          label: 'Small',
          checked: true,
          click() {
            return screenController.setWindowSize('initial')
          },
        },
        {
          label: 'Large',
          click() {
            return screenController.setWindowSize('large')
          },
        },
      ],
    },
    {
      type: 'submenu',
      label: 'Screen edge',
      submenu: [
        {
          label: 'Top left',
          click() {
            return screenController.moveWindowToScreenEdge('top-left')
          },
        },
        {
          label: 'Top right',
          click() {
            return screenController.moveWindowToScreenEdge('top-right')
          },
        },
        {
          label: 'Bottom right',
          click() {
            return screenController.moveWindowToScreenEdge('bottom-right')
          },
        },
        {
          label: 'Bottom left',
          click() {
            return screenController.moveWindowToScreenEdge('bottom-left')
          },
        },
      ],
    },
    {
      type: 'submenu',
      label: 'Display',
      submenu: availableDisplays.map(display => {
        return {
          label: `Display ${display.id} (${display.size.width}x${display.size.height})`,
          click() {
            return screenController.setActiveDisplay(display.id)
          },
        }
      }),
    },
    {
      type: 'submenu',
      label: 'Video Input Source',
      enabled: videoInputDevices?.length > 0,
      submenu: videoInputDevices
        ? videoInputDevices.map(device => {
            return {
              label: device.label,
              click() {
                win.webContents.send('videoInputChange', device.id)
              },
            }
          })
        : [],
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

  mainTray.setContextMenu(contextMenu)
}

/**
 * Create main electron window
 */
async function createWindow() {
  win = new BrowserWindow({
    icon: nativeImage.createFromPath(
      path.join(assetsPath, 'assets', 'icon.png')
    ),
    width: 300,
    height: 300,
    maxWidth: 300,
    maxHeight: 300,
    frame: false,
    skipTaskbar: true,
    titleBarStyle: 'customButtonsOnHover',
    transparent: true,
    alwaysOnTop: true,
    maximizable: false,
    show: !isLinux,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  win.setVisibleOnAllWorkspaces(true)

  win.on('ready-to-show', () => {
    const shouldCreateNewWindowForLinux = isLinux && !isLinuxWindowReadyToShow

    if (shouldCreateNewWindowForLinux) {
      win.hide()

      createWindow().then(registerShortcuts)

      win.show()

      isLinuxWindowReadyToShow = true
    }
  })

  isLinux && win.on('closed', app.quit)
}

ipcMain.on('videoInputDevices', (_, devices: any) => {
  videoInputDevices = devices

  createTrayContextMenu()
})

app
  .whenReady()
  .then(createWindow)
  .then(createTrayMenu)
  .then(registerShortcuts)
  .catch(e => console.error(e))

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
