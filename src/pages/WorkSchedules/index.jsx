import React, { useEffect, useState } from 'react'
import { Typography, Box } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'

import SessionTime from './SessionTime'
import useCustomFetch from '../../hooks/useCustomFetch'
import { URL } from '../../api'
import SnackBar from '../../components/SnackBar'
import Schedules from './Schedules'
import useManualFetch from '../../hooks/useManualFetch'
import LeftArrow from '../../assets/img/left-arrow.svg'
import './style.scss'
import { Tooltip, LeftCircleArrow } from '../../components/Tooltip'
import messages from '../../lib/iconMsg'

const WorkSchedule = () => {
  const { id } = useParams()
  const history = useHistory()
  const [open, setOpen] = useState(false)
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
    setOpen(true)
  }

  function handleBackButton() {
    history.push('/doctors')
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }


  return (
    <div style={{ width: 'calc(100% - 257px)' }} className="doc-work-schedule-wrap">
      {data && (
        <Box>
          <Box>
            <Box display="flex">
            
              <LeftCircleArrow  onClick={handleBackButton} title={messages.dashboard} placement='left' />
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
       {response && response.statusCode === 200 && (
        <SnackBar
          openDialog={open}
          message={response.message}
          onclose={handleClose}
          severity={'success'}
        />
      )}
      {response && response.statusCode !== 200 && (
        <SnackBar
          openDialog={open}
          message={response.message}
          onclose={handleClose}
          severity={'error'}
        />
      )}
      {(response && response.name === 'Error' && response.status === 500 && (
        <SnackBar
          openDialog={open}
          message={'Internal server error'}
          onclose={handleClose}
          severity={'error'}
        />
      )) ||
        (response && response.name === 'Error' && response.status !== 500 && (
          <SnackBar
            openDialog={open}
            message={'Something went wrong'}
            onclose={handleClose}
            severity={'error'}
          />
        ))}
    </div>
  )
}

export default WorkSchedule
