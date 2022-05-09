import { ipcMain } from 'electron'

import { createContextMenu, setVirtualState, updateMenu } from 'main/modules'
import { VideoDevice } from 'shared/types'
import { IPC } from 'shared/constants'

export function registerVideoInputListInTrayByIPC() {
  const { GET_VIDEO_INPUTS, GET_ACTIVE_VIDEO_INPUT_ID } = IPC.DEVICES

  ipcMain.on(GET_VIDEO_INPUTS, (_, devices: VideoDevice[]) => {
    if (devices.length < 1) return

    setVirtualState({
      videoInputDevices: devices,
    })

    createContextMenu()
  })

  ipcMain.on(GET_ACTIVE_VIDEO_INPUT_ID, (_, id: string) => {
    if (!id) return

    setVirtualState({
      activeVideoInputId: id,
    })

    updateMenu()
  })
}
