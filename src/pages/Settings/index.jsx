import React from 'react'
import { Box, Typography, Avatar, makeStyles } from '@material-ui/core'

import HospitalDetails from './HospitalDetails'
import useCustomFecth from '../../hooks/useCustomFetch'
import { METHOD, URL } from '../../api'

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

const key = {
    accountKey: localStorage.getItem('accountKey')
}

function Settings() {
  const classes = useStyle()

  const [hospitalDetails] = useCustomFecth(METHOD.GET, URL.hospitalDetailsView, key)

  return (
    <Box className={classes.container}>
      <Box display="flex" className={classes.content}>
        <Box className={classes.heading}>
          <Typography className={classes.text}>Hospital Settings</Typography>
          {hospitalDetails && <Avatar src={hospitalDetails.hospitalPhoto} className={classes.photo} />}
        </Box>
        {hospitalDetails && <HospitalDetails hospitalDetails={hospitalDetails} />}
      </Box>
    </Box>
  )
}

export default Settings
