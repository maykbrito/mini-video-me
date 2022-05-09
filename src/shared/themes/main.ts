import { userPreferences } from 'shared/store'
import { makeTheme } from './factory'

const { themes, defaultTheme } = makeTheme(
  userPreferences.get('customThemes', [])
)

export { themes, defaultTheme }
