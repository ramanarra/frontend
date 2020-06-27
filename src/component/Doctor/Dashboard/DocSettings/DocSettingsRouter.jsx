import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { paths } from '../../../../config'
import Reschedule from './Reschedule'
import Profile from './Profile'
import Schedule from './Schedule'

const DocSettingsRouter = () => {
  return (
    <Switch>
      <Route path={paths.hospital.doctor.default} exact component={Profile} />
      <Route path={paths.hospital.doctor.profile} component={Profile} />
      <Route path={paths.hospital.doctor.schedule} component={Schedule} />
      <Route path={paths.hospital.doctor.reschedule} component={Reschedule} />
      {/* <Route path={paths.hospital.doctor.questions} component={}/>
            <Route path={paths.hospital.doctor.schedule} component={}/> */}
    </Switch>
  )
}

export default DocSettingsRouter
