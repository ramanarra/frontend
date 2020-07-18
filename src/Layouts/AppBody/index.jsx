import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import DoctorRoutes, { PatientRoutes } from '../routes'

const AppBody = () => {
  if (localStorage.getItem('loginUser') === 'doctor') {
    return (
      <div style={{ width: 'calc(100% - 79px)' }}>
        <Switch>
          {DoctorRoutes.map((route, index) => {
            const Component = route.component

            return (
              <Route
                path={route.path}
                exact={route.exact}
                name={route.name}
                key={index}
              >
                <Component />
              </Route>
            )
          })}

          <Route extact path={'/'} render={() => <Redirect to={'/doctors'} />} />
        </Switch>
      </div>
    )
  }

  if (localStorage.getItem('loginUser') === 'patient') {
    return (
      <div style={{ width: 'calc(100% - 79px)' }}>
        <Switch>
          {PatientRoutes.map((route, index) => {
            const Component = route.component

            return (
              <Route
                path={route.path}
                exact={route.exact}
                name={route.name}
                key={index}
              >
                <Component />
              </Route>
            )
          })}

          <Route extact path={'/'} render={() => <Redirect to={'/patient/appoinments'} />} />
        </Switch>
      </div>
    )
  }
}

export default AppBody
