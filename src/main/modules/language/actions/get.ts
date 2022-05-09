import { languages, defaultLanguage } from 'shared/i18n/main'
import { userPreferences } from 'shared/store'

export function getLanguage() {
  const languageId = userPreferences.get('language')

  const language =
    languages.find(({ id }) => id === languageId) || defaultLanguage

  return language
}
