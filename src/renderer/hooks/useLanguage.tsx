import {
  useMemo,
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from 'react'

import {
  languages,
  defaultLanguage,
  getTerm as _getTerm,
} from 'shared/i18n/renderer'

import { DictionaryKeys, Language } from 'shared/types'
import { config } from 'renderer/store'

interface LanguageStore extends Language {
  getTerm: (term: DictionaryKeys) => string
}

const { MiniVideoMe } = window
const LanguageContext = createContext({} as LanguageStore)

export function useLanguage() {
  return useContext(LanguageContext)
}

export function LanguageProvider({ children }) {
  const [currentLanguageId, setCurrentLanguageId] = useState(config.language)

  const language = useMemo(
    () =>
      languages.find((language) => language.id === currentLanguageId) ||
      defaultLanguage,
    [currentLanguageId]
  )

  const getTerm = useCallback(
    (key: DictionaryKeys, languageId?: string) => {
      return _getTerm(key, languageId || currentLanguageId)
    },
    [currentLanguageId]
  )

  useEffect(() => {
    MiniVideoMe.whenLanguageUpdates((languageId) => {
      setCurrentLanguageId(languageId)
    })
  }, [])

  return (
    <LanguageContext.Provider
      value={{
        ...language,
        getTerm,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
