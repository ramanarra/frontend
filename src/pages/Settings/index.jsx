import React, {useEffect, useState} from 'react'
import { Box, Typography, Avatar, makeStyles } from '@material-ui/core'

import HospitalDetails from './HospitalDetails'
import useCustomFecth from '../../hooks/useCustomFetch'
import { METHOD, URL } from '../../api'
import useHospitalSettingWrite from '../../hooks/useHospitalSettingWrite'
import useHospitalDetailsUpdate from '../../hooks/useHospitalDetailsUpdate'
import SnackBar from '../../components/SnackBar'

const useStyle = makeStyles((theme) => ({
  container: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    width: '100%',
    height: '100%',
  },
  content: {
    height: 'calc(100% - 30px)',
    width: 'calc(100% - 30px)',
    backgroundColor: '#ffffff',
    padding: 30,
    overflow: 'auto',
  },
  photo: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    border: '5px solid #9DE1FF',
    marginTop: 62,
  },
  heading: {
    width: 160,
  },
  text: {
    color: '#525151',
  },
}))

function Settings() {
  const classes = useStyle()

  const [open, setOpen] = useState(false)

  const accountKey = localStorage.getItem('accountKey')

  const [hospitalDetails, refetch] = useCustomFecth(
    METHOD.GET,
    `${URL.hospitalDetailsView}?accountKey=${accountKey}`
  )

  const isAbleToWrite = useHospitalSettingWrite()

  const [onSave, response] = useHospitalDetailsUpdate(refetch)



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
      <Box display="flex" className={classes.content}>
        <Box className={classes.heading}>
          <Typography className={classes.text}>Hospital Settings</Typography>
          {hospitalDetails && (
            <Avatar src={hospitalDetails.hospitalPhoto} className={classes.photo} />
          )}
        </Box>
        {hospitalDetails && (
          <HospitalDetails
            hospitalDetails={hospitalDetails}
            isAbleToWrite={isAbleToWrite}
            onSave={onSave}
          />
        )}
      </Box>
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

export default Settings
