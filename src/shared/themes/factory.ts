import * as themesModules from 'themes'
import { Theme } from 'shared/types'

export function makeTheme(customThemes: Theme[]) {
  const mainThemes: Theme[] = Object.values(themesModules)
  const defaultTheme = mainThemes.find((theme) => theme.id === 'default')
  const themes = [...mainThemes, ...customThemes]

  return { themes, defaultTheme }
}
