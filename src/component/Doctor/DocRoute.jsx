import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import { paths } from '../../config'
import Settings from '../Settings'
import DocSettings from './Dashboard/DocSettings'

const DocRoute = () => {
  return (
    <Switch>
      <Route path={paths.hospital.dashboard} component={Dashboard} />
      <Route path={paths.hospital.settings} component={Settings} />
      <Route path="/" exact component={Dashboard} />
      <Route path={paths.home} exact component={Dashboard} />
      <Route path={paths.hospital.doctor.default} component={DocSettings} />
      {/* <Route path="*" component="404 not found"/> */}
    </Switch>
  )
}

export default DocRoute
