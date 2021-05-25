import { contextBridge, ipcRenderer } from 'electron'
import { userPreferences } from './store'

const store = userPreferences.store

export const api = {
  config: store,

  sendDoubleClick: (args?: any) => {
    ipcRenderer.send('double-click', args)
  },
  sendVideoInputDevices: (args: string) => {
    ipcRenderer.send('videoInputDevices', args)
  },
  on: (channel: string, callback: Function) => {
    const newCallback = (_:Object, data: Function) => callback(data)
    ipcRenderer.on(channel, newCallback)
  }
}

contextBridge.exposeInMainWorld('MiniVideoMe', api)
