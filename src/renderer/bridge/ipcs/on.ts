import { ipcRenderer } from 'electron'

export function on(channel: string, callback: Function) {
  ipcRenderer.on(channel, (_, data) => callback(data))
}
