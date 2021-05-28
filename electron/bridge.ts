import { contextBridge, ipcRenderer } from 'electron'
import { userPreferences } from './store'

export type VideoDevice = {
  id: string
  label: string
}

const store = userPreferences.store

export const api = {
  config: store,

  sendDoubleClick: (args?: any) => {
    ipcRenderer.send('double-click', args)
  },
  sendVideoInputDevices: (devices: VideoDevice[]) => {
    ipcRenderer.send('videoInputDevices', devices)
  },
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  },
}

contextBridge.exposeInMainWorld('MiniVideoMe', api)
