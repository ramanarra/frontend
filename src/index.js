import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'

import './assets/fonts/product-sans/stylesheet.css'
import './assets/fonts/icomoon.css'
import './index.scss'
import theme from './theme'
import Login from './pages/Login'
import Layouts from './Layouts'
import * as serviceWorker from './serviceWorker'
import PatientSignup from './pages/PatientSignup'
import DoctorSignUp from './pages/DoctorSignUp'
import DoctorLogin from './pages/Login/DoctorLogin'
import CorporateLogin from './pages/Login/Corporatelogin'
import privacyPolicy from './pages/privacyPolicy/'
import VideoConsultation from './pages/VideoConsultation'
import { Provider } from 'react-redux'
import store from './store'
import combineReducers from './reducers'
import { createStore } from 'redux'
import ForgotPassword from './pages/ForgotPassword'
import OtpVerifiaction from './pages/OtpVerification'

const store = createStore(combineReducers)

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      
      <BrowserRouter basename="/app">
        <Switch>
          <Route exact path={'/login'} component={Login} />
          <Route exact path={'/doctor/login'} component={DoctorLogin} />
          <Route exact path={'/patient/registration'} component={PatientSignup} />
          <Route exact path={'/doctor/registration'} component={DoctorSignUp} />
          <Route exact path={'/video-consultation'} component={VideoConsultation} />
          <Route exact path={'/corporateLogin'} component={CorporateLogin} />
          <Route exact path={'/privacy'} component={privacyPolicy} />
          <Route exact path={'/forgot-password'} component={ForgotPassword} />
          <Route exact path={'/otp-verification'} component={OtpVerifiaction} />
          <Route path={'/'} component={Layouts} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>

    </Provider>,
  document.getElementById('root')
  
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
