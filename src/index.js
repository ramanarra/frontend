import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, HashRouter, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'

import './assets/fonts/product-sans/stylesheet.css'
import './assets/fonts/icomoon.css'
import './index.scss'
import theme from './theme'
import SelectRole from './pages/SelectRole'
import Login from './pages/Login'
import Layouts from './Layouts'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Switch>
          <Route exact path={'/select-role'} component={SelectRole} />
          <Route exact path={'/login'} component={Login} />
          <Route path={'/'} component={Layouts} />
        </Switch>
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
