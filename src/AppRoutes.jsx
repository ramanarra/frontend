import React from 'react'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import AuthRouter from './component/Route/AuthRouter'
import SelectRole from './component/SelectRole'
import Home from './component/Home'
import SignIn from './component/SignIn'
import { paths } from './config'
import Signup from './component/Doctor/SignUp'

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path={paths.role} component={SelectRole} />
        <AuthRouter path={paths.home} component={Home} />
        <Route path={paths.login} component={SignIn} />
        <Route path={paths.hospital.signup} component={Signup} />
        <AuthRouter path="/" exact component={Home} />
      </Switch>
    </Router>
  )
}

export default AppRoutes
