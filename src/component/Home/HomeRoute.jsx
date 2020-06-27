import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Doctor from '../Doctor'
import { paths } from '../../config'

const HomeRoute = () => {
  return (
    <Switch>
      <Route path={paths.hospital.default} component={Doctor} />
      <Route path="*" component={Doctor} />
    </Switch>
  )
}

export default HomeRoute
