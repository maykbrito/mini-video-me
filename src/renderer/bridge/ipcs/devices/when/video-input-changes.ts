import { ipcRenderer } from 'electron'

import { IPC } from 'shared/constants'

export function whenVideoInputChanges(fn: (...args: any[]) => void) {
  const { WHEN_VIDEO_INPUT_CHANGES } = IPC.DEVICES

  ipcRenderer.on(WHEN_VIDEO_INPUT_CHANGES, (_, ...args) => {
    localStorage.setItem('deviceId', args[0])
    fn(...args)
  })
}
