import React, { useEffect } from 'react'
import { Typography, Box } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'

import SessionTime from './SessionTime'
import useCustomFetch from '../../hooks/useCustomFetch'
import { URL } from '../../api'
import OverBooking from './OverBooking'
import Schedules from './Schedules'
import useManualFetch from '../../hooks/useManualFetch'
import LeftArrow from '../../assets/img/left-arrow.svg'
import './style.scss'

const WorkSchedule = () => {
  const { id } = useParams()
  const history = useHistory()
  const [data, reloadData] = useCustomFetch(
    'GET',
    `${URL.workschedule.data}?doctorKey=${id}`
  )
  const [updateData, updateError, isUpdating, response] = useManualFetch()

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

  function handleBackButton() {
    history.push('/doctors')
  }

  return (
    <div style={{ width: 'calc(100% - 257px)' }} className="doc-work-schedule-wrap">
      {data && (
        <Box>
          <Box>
            <Box display="flex">
              <img
                src={LeftArrow}
                alt="leftArrow"
                className="leftArrow"
                onClick={handleBackButton}
              />
              <Typography className="doctor-name">{`${'Dr. '}${localStorage.getItem(
                'doctorName'
              )}`}</Typography>
            </Box>
            <Typography variant="h1" className="main-head">
              Work Schedules
            </Typography>
          </Box>

          <SessionTime
            data={data?.configDetails?.consultationSessionTimings}
            handleUpdate={handleUpdate}
            response={response}
          />
          {/* <OverBooking data={data?.configDetails} handleUpdate={handleUpdate} /> */}
          <Schedules data={data} handleUpdate={handleUpdate} />
        </Box>
      )}
    </div>
  )
}

export default WorkSchedule
