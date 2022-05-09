import { ipcRenderer } from 'electron'

import { IPC } from 'shared/constants'

export function whenLanguageUpdates(fn: (...args: any[]) => void) {
  const { UPDATE } = IPC.LANGUAGES

  ipcRenderer.on(UPDATE, (_, ...args) => {
    fn(...args)
  })
}
