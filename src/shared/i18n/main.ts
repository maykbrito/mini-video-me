import { userPreferences } from 'shared/store'
import { makeLanguage } from './factory'

const { languages, defaultLanguage, getTerm } = makeLanguage(
  () => userPreferences.get('language', 'default'),
  () => userPreferences.get('customLanguages', [])
)

export { languages, defaultLanguage, getTerm }
