import { contextBridge, ipcRenderer } from 'electron'
import { userPreferences } from './store'

const store = userPreferences.store

export const api = {
  config: store,

  sendDoubleClick: (args?: any) => {
    ipcRenderer.send('double-click', args)
  }
}

contextBridge.exposeInMainWorld('MiniVideoMe', api)
