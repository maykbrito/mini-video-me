import Store from 'electron-store'

import { userPreferencesSchema } from './schema'
import { getDefaultStore } from './default'

export { getDefaultStore }

export const userPreferences = new Store({
  defaults: getDefaultStore(),
  clearInvalidConfig: true,
  schema: userPreferencesSchema,
})
