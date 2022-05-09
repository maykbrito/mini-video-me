import { Tray } from 'electron'

import { createContextMenu, trayIconPath } from './context'
import { setVirtualState } from '../../state'
import { APP_CONFIG } from '~/app.config'

export async function createTrayMenu() {
  const tray = new Tray(trayIconPath)

  setVirtualState({ tray })

  tray.setToolTip(APP_CONFIG.TITLE)

  tray.on('click', () => tray.popUpContextMenu())

  createContextMenu()
}
