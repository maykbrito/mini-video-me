import { getVirtualState } from 'main/modules/state'
import { userPreferences } from 'shared/store'
import { IPC } from 'shared/constants'

export function setTheme(id: string) {
  const { mainWindow } = getVirtualState()
  const { UPDATE } = IPC.THEMES

  userPreferences.set('theme', id)
  mainWindow.webContents.send(UPDATE, id)
}
