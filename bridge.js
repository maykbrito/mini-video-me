const { contextBridge } = require('electron')

const api = {
  sendDoubleClick(args) {
    ipcRenderer.send('double-click', args)
  }
}

contextBridge.exposeInMainWorld('MiniVideoMe', api)