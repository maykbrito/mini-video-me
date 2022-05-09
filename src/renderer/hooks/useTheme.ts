import { useCallback, useEffect, useMemo, useState } from 'react'

import { defaultTheme, themes } from 'shared/themes/renderer'
import { config } from 'renderer/store'
import { useRoot } from './useRoot'

const { MiniVideoMe } = window

export function useTheme() {
  const [currentThemeId, setCurrentThemeId] = useState(config.theme)
  const root = useRoot()

  const theme = useMemo(() => {
    const theme =
      themes.find((theme) => theme.id === currentThemeId) || defaultTheme

    const entriesToOverrideInTheme = Object.entries(config.themeOverrides)

    const themeWithPossibleOverrides = entriesToOverrideInTheme.reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value ? value : theme[key] }),
      theme
    )

    return themeWithPossibleOverrides
  }, [currentThemeId])

  const applyTheme = useCallback(() => {
    applyBorder()
    applyTextColor()
  }, [theme])

  const applyBorder = useCallback(() => {
    theme?.borderColor &&
      root.style.setProperty('--border-color', theme.borderColor)

    theme?.borderWidth &&
      root.style.setProperty('--border-width', theme.borderWidth)
  }, [theme])

  const applyTextColor = useCallback(() => {
    theme?.textColor && root.style.setProperty('--text-color', theme.textColor)
  }, [theme])

  useEffect(() => {
    MiniVideoMe.whenThemeUpdates((themeId) => {
      setCurrentThemeId(themeId)
    })
  }, [])

  useEffect(() => {
    applyTheme()
  }, [currentThemeId])

  return {
    applyTheme,
  }
}
