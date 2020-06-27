import React from 'react'
import ReactDOM from 'react-dom'

import { ThemeProvider } from '@material-ui/core'

import './index.scss'
import './assets/fonts/icomoon.css'
import './palette.scss'

import theme from './theme'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
