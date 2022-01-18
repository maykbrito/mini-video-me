import { BrowserWindow } from 'electron'

declare const PREFERENCES_WINDOW_WEBPACK_ENTRY: string

export async function createPreferencesWindow() {
  const win = new BrowserWindow({
    width: 600,
    minWidth: 400,
    maxWidth: 600,
    frame: true,
    maximizable: false,
  })

  win.loadURL(PREFERENCES_WINDOW_WEBPACK_ENTRY)
}
