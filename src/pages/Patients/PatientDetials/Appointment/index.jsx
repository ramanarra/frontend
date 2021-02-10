import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import AppointmentCard from './AppointmentCard'
import api, { URL } from '../../../../api'

const Appointment = ({ params, headers }) => {
  const [appointment, setAppointment] = useState(null)
  const [tab, setTab] = useState(0)

  useEffect(() => {
    loadAppointment()
  }, [tab])

  const loadAppointment = () => {
    const url = !tab ? URL.patient.upcomingApp : URL.patient.pastApp
    api.post(url, params, { headers }).then((res) => setAppointment(res.data))
  }

  const switchTab = (id) => {
    setTab(id)
  }

  return (
    <div className="appointment-section">
      <div className="appointment-type-tab">
        <div className="upcoming-tab-wrap">
          <span
            className={'upcoming-tab appointment-tab' + (!tab ? ' active' : '')}
            onClick={switchTab.bind(this, 0)}
          >
            Upcoming
          </span>
        </div>
        <div className="past-tab-wrap">
          <span
            className={'past-tab appointment-tab' + (!!tab ? ' active' : '')}
            onClick={switchTab.bind(this, 1)}
          >
            Past
          </span>
        </div>
      </div>

      <div className="appointment-content-wrap">
        <Grid container spacing={2} className="appointment-list-wrap">
          {!!appointment?.length ? (
            appointment?.map((i, index) => (
              <Grid item xs={tab === 0 ? 6 : 5.5}>
                <AppointmentCard data={i} isPast={!!tab} index={index} />
              </Grid>
            ))
          ) : (
            <Grid item xs={6} className="no-appointment">
              No {tab === 0 ? 'upcoming' : 'past'} appointments
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  )
}

export default Appointment
