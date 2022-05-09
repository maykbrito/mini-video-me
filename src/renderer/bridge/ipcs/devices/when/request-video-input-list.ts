import { ipcRenderer } from 'electron'

import { IPC } from 'shared/constants'

export function whenRequestVideoInputList(fn: (...args: any[]) => void) {
  const { GET_VIDEO_INPUTS } = IPC.DEVICES

  ipcRenderer.on(GET_VIDEO_INPUTS, (_, ...args) => {
    fn(...args)
  })
}
