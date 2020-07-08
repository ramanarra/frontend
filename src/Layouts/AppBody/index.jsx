import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import routes from '../routes'

const AppBody = () => {
  return (
    <div>
      <Switch>
        {routes.map((route, index) => {
          const Component = route.component

          return (
            <Route path={route.path} key={index}>
              <Component />
            </Route>
          )
        })}

        <Route extact path={'/'} render={() => <Redirect to={'/doctors'} />} />
      </Switch>
    </div>
  )
}

export default AppBody
