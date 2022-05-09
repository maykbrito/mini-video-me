import { makeLanguage } from './factory'

const { config } = window.MiniVideoMe

const { languages, defaultLanguage, getTerm } = makeLanguage(
  () => config.language || 'default',
  () => config.customLanguages
)

export { languages, defaultLanguage, getTerm }
