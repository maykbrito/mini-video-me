import { makeTheme } from './factory'

const { themes, defaultTheme } = makeTheme(
  window.MiniVideoMe.config.customThemes
)

export { themes, defaultTheme }
