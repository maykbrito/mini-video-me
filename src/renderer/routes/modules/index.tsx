import { HashRouter as Router, Routes } from 'react-router-dom'

export { Route } from 'react-router-dom'

interface WindowRouter {
  routes: {
    [windowID: string]: () => JSX.Element
  }
}

export function WindowRouter({ routes }: WindowRouter) {
  const selectAllSlashes = /\//g
  const windowID = location.hash.split(selectAllSlashes)?.[1] || 'main'
  const lowerCasedWindowID = windowID.toLowerCase()

  const routesWithLowerCasedKeys = Object.keys(routes).reduce(
    (acc, key) => ({
      ...acc,
      [key.toLowerCase()]: routes[key],
    }),
    {}
  )

  const Route = routesWithLowerCasedKeys[lowerCasedWindowID]

  if (!Route) return null

  return (
    <Router basename={windowID}>
      <Routes>{Route()}</Routes>
    </Router>
  )
}
