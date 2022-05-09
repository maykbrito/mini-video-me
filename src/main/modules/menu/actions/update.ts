import { getVirtualState } from 'main/modules/state'
import { createContextMenu } from './context'
import { IPC } from 'shared/constants'

export async function updateMenu() {
  const { mainWindow } = getVirtualState()
  const { GET_VIDEO_INPUTS } = IPC.DEVICES

  await createContextMenu()

  mainWindow.webContents.send(GET_VIDEO_INPUTS)
}
