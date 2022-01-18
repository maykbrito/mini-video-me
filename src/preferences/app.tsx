import { render } from 'react-dom'
import { Main } from './components/Main'
import { applyGlobalCss } from './styles/global'

function App() {
  applyGlobalCss()

  return <Main />
}

render(<App />, document.getElementById('root'))
