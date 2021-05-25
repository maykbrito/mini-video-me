import { contextBridge, ipcRenderer } from 'electron'
import { userPreferences } from './store'

const store = userPreferences.store

console.log('preload.js loaded');

export const api = {
  config: store,

  sendDoubleClick: (args?: any) => {
    ipcRenderer.send('double-click', args)
  }
}

contextBridge.exposeInMainWorld('MiniVideoMe', api)
