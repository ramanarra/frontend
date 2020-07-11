import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import SessionTime from './SessionTime'
import useCustomFetch from '../../hooks/useCustomFetch'
import { URL } from '../../api'
import { useParams } from 'react-router-dom'
import './style.scss'
import OverBooking from './OverBooking'
import Schedules from './Schedules'

const WorkSchedule = () => {
  const { id } = useParams()
  const [data] = useCustomFetch('GET', URL.workScheduleView, { doctorKey: 'Doc_5' })

  return (
    <div className="doc-work-schedule-wrap">
      <Typography variant="h1" className="main-head">
        Work Schedules
      </Typography>
      <SessionTime data={data?.configDetails?.consultationSessionTimings} />
      <OverBooking data={data?.configDetails} />
      <Schedules data={data} />
    </div>
  )
}

export default WorkSchedule
