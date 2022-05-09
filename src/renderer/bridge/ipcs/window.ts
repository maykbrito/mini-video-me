import { ipcRenderer } from 'electron'

import { IPC } from 'shared/constants'

export function toggleWindowSize() {
  const { TOGGLE_SIZE } = IPC.WINDOWS

  ipcRenderer.send(TOGGLE_SIZE)
}
