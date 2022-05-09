import { WindowRouter, Route } from './modules'

import { MainScreen } from 'renderer/screens'

export function AppRoutes() {
  return (
    <WindowRouter
      routes={{
        main: () => <Route path="/" element={<MainScreen />} />,
      }}
    />
  )
}
