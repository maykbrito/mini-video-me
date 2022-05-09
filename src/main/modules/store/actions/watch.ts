import chokidar from 'chokidar'
import { app } from 'electron'

import { userPreferences } from 'shared/store'

let shouldRestartWhenStoreChanges = true

export function setIfStoreShouldRestartWhenItChanges(state: boolean) {
  shouldRestartWhenStoreChanges = state
}

export function watchStoreFileAndRestartAppWhenItChanges() {
  chokidar.watch(userPreferences.path).on('change', () => {
    if (!shouldRestartWhenStoreChanges) return

    app.relaunch()
    app.exit()
  })
}
