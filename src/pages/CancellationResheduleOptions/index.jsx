import React, { useMemo, useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { URL, METHOD } from '../../api'
import Cancellation from './Cancellation'
import Reschedule from './Reschedule'
import useCustomFetch from '../../hooks/useCustomFetch'
import useDoctorConfigUpdate from '../../hooks/useDoctorConfigUpdate'
import useDocSettingWrite from '../../hooks/useDocSettingWrite'
import LeftArrow from '../../assets/img/left-arrow.svg'
import SnackBar from '../../components/SnackBar'
import { Tooltip, LeftCircleArrow } from '../../components/Tooltip'
import messages from '../../lib/iconMsg'

const useStyles = makeStyles(() => ({
  container: {
    width: 'calc(100% - 257px)',
    paddingTop: 20,
    paddingLeft: 60,
    overflow: 'auto',
  },

  leftArrow: {
    width: 20,
    cursor: 'pointer',
    marginBottom: 41,
  },

  name: {
    color: '#2b2929',
    fontSize: 17.5,
    marginBottom: 41,
    paddingLeft: 20,
    fontWeight: 'bold',
  },

  text: {
    color: '#2b2929',
    fontSize: 16.5,
    marginBottom: 41,
  },
}))
function CancellationResheduleOptions() {
  const classes = useStyles()
  const { id } = useParams()
  const history = useHistory()

  const isAbleToWrite = useDocSettingWrite()

  const [open, setOpen] = useState(false)

  const key = useMemo(() => {
    return {
      doctorKey: id,
    }
  }, [id])
  const [data, refetch] = useCustomFetch(
    METHOD.GET,
    URL.doctorSettingsPersonalView,
    key
  )

  function handleBackButton() {
    history.push('/doctors')
  }

  const [onSave, response] = useDoctorConfigUpdate(refetch)

  useEffect(() => {
    setOpen(true)
  },[response])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <Box className={classes.container}>
      {data && (
        <Box>
          <Box>
            <Box display="flex">
              <LeftCircleArrow  onClick={handleBackButton} title={messages.dashboard} placement='left'/>
              {data?.doctorDetails && (
                <Typography className={classes.name}>{`${'Dr. '}${
                  data.doctorDetails.doctorName
                }`}</Typography>
              )}
            </Box>
            <Typography className={classes.text}>
              Cancellation/Reschedule Options
            </Typography>
          </Box>

          <Cancellation
            configDetails={data?.configDetails}
            doctorKey={id}
            onSave={onSave}
            isAbleToWrite={isAbleToWrite}
          />
          <Reschedule
            configDetails={data?.configDetails}
            doctorKey={id}
            onSave={onSave}
            isAbleToWrite={isAbleToWrite}
          />
        </Box>
      )}
      {response && response.statusCode && response.statusCode === 200 && (
        <SnackBar
          openDialog={open}
          message={response.message}
          onclose={handleClose}
          severity={'success'}
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
      {response && response.statusCode && response.statusCode !== 200 && (
        <SnackBar
          openDialog={open}
          message={response.message}
          onclose={handleClose}
          severity={'error'}
        />
      )}
    </Box>
  )
}

export default CancellationResheduleOptions
