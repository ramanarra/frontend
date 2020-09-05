import React, {useState, useEffect} from 'react'
import { Box, Typography, makeStyles } from '@material-ui/core'

import PatientDetails from './PatientDetails'
import useCustomFetch from '../../hooks/useCustomFetch'
import { METHOD, URL } from '../../api'
import usePatientDetailsUpdate from '../../hooks/usePatientDetailsUpdate'
import SnackBar from '../../components/SnackBar'

const useStyle = makeStyles((theme) => ({
  container: {
    padding: '23px 35px',
    width: '100%',
    height: '100%',
  },
  heading: {
    width: 210,
  },
  text: {
    fontSize: 17.5,
    color: '#605e5e',
  },
  photo: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    border: '7px solid #9DE1FF',
    marginTop: 65,
    marginRight: 10,
  },
}))


function PatientSettings() {
  const classes = useStyle()

  const patientId = localStorage.getItem('patientId')

  const [open, setOpen] = useState(false)

  const [data, refetch] = useCustomFetch(METHOD.GET, `${URL.patientViewDetails}${'?patientId='}${patientId}`)

  const [onSave, response] = usePatientDetailsUpdate(refetch)  

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
      <Box className={classes.heading}>
        <Typography className={classes.text}>Patient Settings</Typography>
      </Box>
      {data && <PatientDetails patientDetails={data} patientId={patientId} onSave={onSave} /> }
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

export default PatientSettings
