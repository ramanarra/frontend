import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { URL, METHOD } from '../../api'
import Cancellation from './Cancellation'
import Reschedule from './Reschedule'
import useCustomFetch from '../../hooks/useCustomFetch'
import useDoctorConfigUpdate from '../../hooks/useDoctorConfigUpdate'

const useStyles = makeStyles(() => ({
  container: {
    width: 'calc(100% - 257px)',
    paddingTop: 20,
    paddingLeft: 60,
    overflow: 'auto',
  },

   text: {
    color: '#2b2929',
    fontSize: 16.5,
    marginBottom: 41,
   }
}))
function CancellationResheduleOptions() {
  const classes = useStyles()
  const { id } = useParams()

  const key = useMemo(() => {
    return {
      doctorKey: id,
    }
  }, [id])
  const [data, refetch] = useCustomFetch(
    METHOD.GET,
    URL.doctorSettingsPersonalView,
    key,
  )

  const [onSave] = useDoctorConfigUpdate(refetch)
  return (
    <Box className={classes.container}>
      <Typography className={classes.text}>Cancellation/Reschedule Options</Typography>
      <Cancellation configDetails={data?.configDetails} doctorKey={id} onSave={onSave}/>
      <Reschedule configDetails={data?.configDetails} doctorKey={id} onSave={onSave} />
    </Box>
  )
}

export default CancellationResheduleOptions
