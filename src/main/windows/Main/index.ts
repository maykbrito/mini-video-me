import { nativeImage, app } from 'electron'
import { join } from 'path'

import {
  updateMenu,
  ScreenModule,
  createTrayMenu,
  setVirtualState,
  loadShortcutsModule,
  registerToggleWindowSizeByIPC,
  mergePossibleNewDefaultsInStore,
  watchStoreFileAndRestartAppWhenItChanges,
} from 'main/modules'

import { registerVideoInputListInTrayByIPC } from './ipcs'
import { ENVIRONMENT, PLATFORM } from 'shared/constants'
import { userPreferences } from 'shared/store'
import { createWindow } from 'main/factories'
import { APP_CONFIG } from '~/app.config'

const { TITLE } = APP_CONFIG

mergePossibleNewDefaultsInStore()

export async function MainWindow() {
  const {
    store: {
      hasShadow,
      screen: { initial },
    },
  } = userPreferences

  const mainWindow = createWindow({
    id: 'main',
    hasShadow,
    title: TITLE,
    frame: false,
    center: true,
    resizable: false,
    transparent: true,
    alwaysOnTop: true,
    maximizable: false,
    minimizable: false,
    width: initial.width,
    height: initial.height,
    maxWidth: initial.width,
    maxHeight: initial.height,
    titleBarStyle: 'customButtonsOnHover',

    icon: nativeImage.createFromPath(
      join(__dirname, 'resources', 'icons', 'icon.png')
    ),

    webPreferences: {
      spellcheck: false,
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, 'bridge.js'),
    },
  })

  const screenModule = new ScreenModule(mainWindow)

  setVirtualState({ screen: screenModule, mainWindow })

  PLATFORM.IS_MAC && mainWindow.setWindowButtonVisibility(false)
  ENVIRONMENT.IS_DEV && mainWindow.webContents.openDevTools({ mode: 'detach' })

  mainWindow.setAlwaysOnTop(true, 'screen-saver')

  mainWindow.setVisibleOnAllWorkspaces(true, {
    visibleOnFullScreen: true,
  })

  PLATFORM.IS_MAC && app.dock.show()

  createTrayMenu()
  loadShortcutsModule()
  registerVideoInputListInTrayByIPC()
  registerToggleWindowSizeByIPC()
  watchStoreFileAndRestartAppWhenItChanges()

  mainWindow.on('moved', () => {
    const { isOnSameScreen } = screenModule.getDisplayByWindowPosition()

    if (isOnSameScreen) return

    screenModule.setActiveDisplayByWindowPosition()
    updateMenu()
  })

  return mainWindow
}
