import { DictionaryKeys, Language } from 'shared/types'
import * as languagePack from 'i18n'

export function makeLanguage(
  initialLanguageId: () => string,
  customLanguages: () => Language[]
) {
  const mainLanguages: Language[] = Object.values(languagePack)

  const defaultLanguage = mainLanguages.find(
    (language) => language.id === 'default'
  )

  const languages = [...mainLanguages, ...customLanguages()]

  function getTerm(key: DictionaryKeys, languageId?: string) {
    const id = languageId || initialLanguageId()

    const language =
      languages.find((language) => language.id === id) || defaultLanguage

    return language?.dictionary[key] || defaultLanguage?.dictionary[key]
  }

  return { languages, defaultLanguage, getTerm }
}
