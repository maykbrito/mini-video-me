import { useCallback, useEffect, useMemo } from 'react'

import { normalizeShortcutMapperKeys } from 'shared/helpers'

interface ShortcutActionsMapper {
  [key: string]: () => void
}

export function useShortcuts(shortcutActionsMapper: ShortcutActionsMapper) {
  const normalizedShortcutActionsMapper = useMemo(
    () => normalizeShortcutMapperKeys(shortcutActionsMapper),
    []
  )

  const isValidShortcut = useCallback(
    (key: string) => {
      return key in normalizedShortcutActionsMapper
    },
    [normalizedShortcutActionsMapper]
  )

  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      const keys = new Set()
      const isEmptyKey = !event.key.replace(/\s+/g, '')

      event.metaKey && keys.add('meta')
      event.altKey && keys.add('alt')
      event.ctrlKey && keys.add('control')
      event.shiftKey && keys.add('shift')

      !isEmptyKey && event.key && keys.add(event.key.toLowerCase())
      isEmptyKey && event.code && keys.add(event.code.toLowerCase())

      const shortcut = [...keys].join('+')

      if (isValidShortcut(shortcut)) {
        normalizedShortcutActionsMapper[shortcut]()
      }
    })
  }, [])
}
