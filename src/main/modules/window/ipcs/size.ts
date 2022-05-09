import { ipcMain } from 'electron'

import { getVirtualState } from 'main/modules/state'
import { updateMenu } from 'main/modules/menu'
import { IPC } from 'shared/constants'

export function registerToggleWindowSizeByIPC() {
  const { screen } = getVirtualState()
  const { TOGGLE_SIZE } = IPC.WINDOWS

  ipcMain.on(TOGGLE_SIZE, () => {
    screen.toggleWindowSize()
    updateMenu()
  })
}
