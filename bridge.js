const { contextBridge, ipcRenderer } = require('electron')
const { userPreferences } = require('./src/store')

const store = userPreferences.store

const api = {
  config: store,

  sendDoubleClick: (args) => {
    ipcRenderer.send('double-click', args)
  }
}

contextBridge.exposeInMainWorld('MiniVideoMe', api)
