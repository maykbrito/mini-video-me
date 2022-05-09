import merge from 'lodash.merge'

import { userPreferences, getDefaultStore } from 'shared/store'

export function mergePossibleNewDefaultsInStore() {
  const updatedPreferences = merge(getDefaultStore(), userPreferences.store)

  userPreferences.set(updatedPreferences)
}
