import ReactDom from 'react-dom'
import React from 'react'

import { LanguageProvider } from './hooks'
import { AppRoutes } from './routes'

import './styles/globals.css'

ReactDom.render(
  <React.StrictMode>
    <LanguageProvider>
      <AppRoutes />
    </LanguageProvider>
  </React.StrictMode>,
  document.querySelector('app')
)
