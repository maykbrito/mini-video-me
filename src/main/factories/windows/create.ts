import { BrowserWindow } from 'electron'

import { ENVIRONMENT } from 'shared/constants'
import { WindowProps } from 'shared/types'
import { APP_CONFIG } from '~/app.config'

export function createWindow({ id, ...settings }: WindowProps) {
  const window = new BrowserWindow(settings)
  const devServerURL = `${APP_CONFIG.RENDERER.DEV_SERVER.URL}#/${id}`

  ENVIRONMENT.IS_DEV
    ? window.loadURL(devServerURL)
    : window.loadFile('index.html', {
        hash: `/${id}`,
      })

  window.on('closed', window.destroy)

  return window
}
