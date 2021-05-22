const { contextBridge, ipcRenderer } = require('electron')
const { userPreferences } = require('./src/store')

const store = userPreferences.store

const api = {
  config: store,

  sendDoubleClick: (args) => {
    ipcRenderer.send('double-click', args)
  },
  sendVideoInputDevices: (args) => {
    ipcRenderer.send('videoInputDevices', args)
  },
  on: (channel, callback) => {
    const newCallback = (_, data) => callback(data)
    ipcRenderer.on(channel, newCallback)
  }
}

contextBridge.exposeInMainWorld('MiniVideoMe', api)
