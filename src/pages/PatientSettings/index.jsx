import React from 'react'
import { Box, Typography, makeStyles } from '@material-ui/core'

import PatientDetails from './PatientDetails'
import useCustomFetch from '../../hooks/useCustomFetch'
import { METHOD, URL } from '../../api'
import usePatientDetailsUpdate from '../../hooks/usePatientDetailsUpdate'

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

  const [data, refetch] = useCustomFetch(METHOD.GET, `${URL.patientViewDetails}${'?patientId='}${patientId}`)

  const [onSave] = usePatientDetailsUpdate(refetch)  

  return (
    <Box className={classes.container}>
      <Box className={classes.heading}>
        <Typography className={classes.text}>Patient Settings</Typography>
      </Box>
      {data && <PatientDetails patientDetails={data} patientId={patientId} onSave={onSave} /> }
    </Box>
  )
}

export default PatientSettings
