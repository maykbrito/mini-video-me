import { Menu, dialog } from 'electron'
import { join } from 'path'

import { setIfStoreShouldRestartWhenItChanges } from '../../store'
import { getDefaultStore, userPreferences } from 'shared/store'
import { ScreenEdge, ScreenSize } from 'main/modules/screen'
import { languages, getTerm } from 'shared/i18n/main'
import { updateMenu as _updateMenu } from './update'
import { setLanguage } from 'main/modules/language'
import { getVirtualState, setVirtualState } from '../../state'
import { DictionaryKeys } from 'shared/types'
import { themes } from 'shared/themes/main'
import { APP_CONFIG } from '~/app.config'
import { IPC } from 'shared/constants'
import { setTheme } from '../../theme'

export const trayIconPath = join(
  __dirname,
  'resources',
  'icons',
  'tray',
  'trayTemplate.png'
)

const shortcuts = userPreferences.get('shortcuts')

export async function createContextMenu() {
  const { screen, mainWindow, tray, videoInputDevices, activeVideoInputId } =
    getVirtualState()

  const { WHEN_VIDEO_INPUT_CHANGES } = IPC.DEVICES

  function updateMenu(callback?: () => void) {
    setIfStoreShouldRestartWhenItChanges(false)

    callback && callback()

    _updateMenu()
    setTimeout(() => setIfStoreShouldRestartWhenItChanges(true), 1000)
  }

  const contextMenu = Menu.buildFromTemplate([
    {
      label: `${APP_CONFIG.TITLE} v${APP_CONFIG.VERSION}`,
      icon: trayIconPath,
      enabled: false,
    },

    {
      label: getTerm('settings'),
      accelerator: shortcuts.openPreferencesFile,
      click() {
        userPreferences.openInEditor()
      },
    },

    {
      label: getTerm('resetSettings'),
      async click() {
        const answer = await dialog.showMessageBox(mainWindow, {
          message: getTerm('resetSettingsConfirmation'),
          buttons: [getTerm('yes'), getTerm('no')],
          type: 'question',
        })

        answer.response === 0 && userPreferences.set(getDefaultStore())
      },
    },

    {
      type: 'separator',
    },

    {
      label: getTerm('language'),
      submenu: languages.map((language) => {
        const currentLanguage = userPreferences.get('language')

        return {
          label: language.displayName,
          type: 'checkbox',
          enabled: language.id !== currentLanguage,
          checked: language.id === currentLanguage,
          click() {
            updateMenu(() => setLanguage(language.id))
          },
        }
      }),
    },

    {
      label: getTerm('themes'),
      submenu: themes.map((theme) => {
        const currentTheme = userPreferences.get('theme')

        const label =
          theme.id === 'default'
            ? getTerm(theme.displayName.toLowerCase() as DictionaryKeys)
            : theme.displayName

        return {
          label,
          type: 'checkbox',
          enabled: theme.id !== currentTheme,
          checked: theme.id === currentTheme,
          click() {
            updateMenu(() => setTheme(theme.id))
          },
        }
      }),
    },

    {
      type: 'separator',
    },

    {
      type: 'submenu',
      label: getTerm('windowSize'),
      submenu: ['initial', 'large'].map((size: ScreenSize) => {
        const isCurrentSelectedSize = screen.getCurrentScreenSize() === size

        return {
          label: getTerm(size === 'initial' ? 'small' : 'large'),
          checked: isCurrentSelectedSize,
          enabled: !isCurrentSelectedSize,
          type: 'checkbox',
          click() {
            updateMenu(() => screen.setWindowSize(size))
          },
        }
      }),
    },

    {
      type: 'submenu',
      label: getTerm('screenEdge'),
      submenu: ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'].map(
        (edge) => {
          const normalizedEdgeKey = edge.replace(
            /[A-Z]/g,
            (letter) => `-${letter.toLocaleLowerCase()}`
          )

          const isCurrentSelectedEdge =
            screen.getCurrentScreenEdge() === normalizedEdgeKey

          return {
            label: getTerm(edge as DictionaryKeys),
            checked: isCurrentSelectedEdge,
            enabled: !isCurrentSelectedEdge,
            type: 'checkbox',
            click() {
              updateMenu(() => {
                screen.moveWindowToScreenEdge(normalizedEdgeKey as ScreenEdge)
              })
            },
          }
        }
      ),
    },

    {
      type: 'submenu',
      label: getTerm('displays'),
      submenu: screen.getAllDisplays().map((display) => {
        const displayNameOrId = display?.name || display.id
        const displayText = getTerm('display')

        const isCurrentSelectedDisplay =
          screen.getActiveDisplay() === display.id

        return {
          label: `${displayText} ${displayNameOrId} (${display.size.width}x${display.size.height})`,
          checked: isCurrentSelectedDisplay,
          enabled: !isCurrentSelectedDisplay,
          type: 'checkbox',
          click() {
            updateMenu(() => {
              screen.setActiveDisplay(display.id)
              screen.updateWindowPosition()
            })
          },
        }
      }),
    },

    {
      type: 'submenu',
      label: getTerm('videoInputSource'),
      enabled: videoInputDevices?.length > 0,
      submenu: videoInputDevices
        ? videoInputDevices.map((device) => {
            const isCurentSelectedDevice = activeVideoInputId === device.id

            return {
              label: device.label,
              checked: isCurentSelectedDevice,
              enabled: !isCurentSelectedDevice,
              type: 'checkbox',
              click() {
                updateMenu(() => {
                  setVirtualState({ activeVideoInputId: device.id })

                  mainWindow.webContents.send(
                    WHEN_VIDEO_INPUT_CHANGES,
                    device.id
                  )
                })
              },
            }
          })
        : [],
    },

    {
      type: 'separator',
    },

    {
      type: 'normal',
      label: getTerm('close'),
      role: 'quit',
      enabled: true,
    },
  ])

  !tray.isDestroyed() && tray.setContextMenu(contextMenu)
}
