import { PLATFORM } from 'shared/constants'

export function normalizeShortcutKey(key: string) {
  let normalizedKey = key.toLowerCase()

  normalizedKey.includes('commandorcontrol') &&
    (normalizedKey = normalizedKey.replace(
      'commandorcontrol',
      PLATFORM.IS_MAC ? 'meta' : 'control'
    ))

  normalizedKey.includes('optionoralt') &&
    (normalizedKey = normalizedKey.replace(
      'optionoralt',
      PLATFORM.IS_MAC ? 'option' : 'alt'
    ))

  return normalizedKey
}

export function normalizeShortcutMapperKeys(mapper: Record<string, unknown>) {
  const transformedMapper = Object.entries(mapper).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [normalizeShortcutKey(key)]: value,
    }),
    {}
  )

  return transformedMapper
}
