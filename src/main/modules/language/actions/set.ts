import { getVirtualState } from 'main/modules/state'
import { userPreferences } from 'shared/store'
import { IPC } from 'shared/constants'

export function setLanguage(id: string) {
  const { mainWindow } = getVirtualState()

  userPreferences.set('language', id)
  mainWindow.webContents.send(IPC.LANGUAGES.UPDATE, id)
}
