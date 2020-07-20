import React, { useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { useParams } from 'react-router-dom'

import SessionTime from './SessionTime'
import useCustomFetch from '../../hooks/useCustomFetch'
import { URL } from '../../api'
import OverBooking from './OverBooking'
import Schedules from './Schedules'
import useManualFetch from '../../hooks/useManualFetch'
import './style.scss'

const WorkSchedule = () => {
  const { id } = useParams()
  const [data, reloadData] = useCustomFetch(
    'GET',
    `${URL.workschedule.data}?doctorKey=${id}`
  )
  const [updateData, updateError, isUpdating] = useManualFetch()

  useEffect(() => {
    !!updateError && console.error(updateError)
  }, [updateError])

  useEffect(() => {
    !isUpdating && reloadData()
  }, [isUpdating])

  const handleUpdate = (params) => {
    const paramsData = { doctorKey: id, ...params }
    updateData('POST', URL.workschedule.update, paramsData)
  }

  return (
    <div style={{ width: 'calc(100% - 257px)' }} className="doc-work-schedule-wrap">
      <Typography variant="h1" className="main-head">
        Work Schedules
      </Typography>
      <SessionTime
        data={data?.configDetails?.consultationSessionTimings}
        handleUpdate={handleUpdate}
      />
      <OverBooking data={data?.configDetails} handleUpdate={handleUpdate} />
      <Schedules data={data} handleUpdate={handleUpdate} />
    </div>
  )
}

export default WorkSchedule
