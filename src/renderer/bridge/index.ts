import { contextBridge } from 'electron'

import { userPreferences } from 'shared/store'
import * as ipcs from './ipcs'

declare global {
  interface Window {
    MiniVideoMe: typeof API
  }
}

export const API = {
  ...ipcs,
  config: userPreferences.store,
  openPreferencesFile: () => userPreferences.openInEditor(),
}

contextBridge.exposeInMainWorld('MiniVideoMe', API)
