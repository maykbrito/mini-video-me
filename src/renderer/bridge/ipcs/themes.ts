import { ipcRenderer } from 'electron'

import { IPC } from 'shared/constants'

export function whenThemeUpdates(fn: (...args: any[]) => void) {
  const { UPDATE } = IPC.THEMES

  ipcRenderer.on(UPDATE, (_, ...args) => {
    fn(...args)
  })
}
