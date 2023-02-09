import { ipcRenderer } from 'electron'

import { VideoDevice } from 'shared/types'
import { IPC } from 'shared/constants'

export function sendVideoInputDeviceList(devices: VideoDevice[]) {
  const { GET_VIDEO_INPUTS } = IPC.DEVICES

  ipcRenderer.send(GET_VIDEO_INPUTS, devices)
}

export function sendActiveVideoInputId(id: string) {
  const { GET_ACTIVE_VIDEO_INPUT_ID } = IPC.DEVICES

  if (id) {
    localStorage.setItem('deviceId', id)
  }

  ipcRenderer.send(GET_ACTIVE_VIDEO_INPUT_ID, id)
}
