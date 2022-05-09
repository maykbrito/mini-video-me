import { screen } from 'electron'

import { macOSDisplaysAdapter } from './adapters/mac'

export function getAllDisplays() {
  const displaysMapper = {
    darwin: macOSDisplaysAdapter,
  }

  const displaysByPlatform = displaysMapper[process.platform]
  const displaysByElectron = screen.getAllDisplays()

  if (displaysByPlatform) {
    return displaysByElectron.map((display) => {
      const displayByPlatform = displaysByPlatform().find(
        (displayByPlatform: any) => displayByPlatform.id === display.id
      )

      if (displayByPlatform) {
        return {
          ...display,
          ...displayByPlatform,
        }
      }

      return display
    })
  }

  return displaysByElectron
}
