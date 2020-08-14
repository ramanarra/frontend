import React from 'react'
import { Box, Typography, Avatar, makeStyles } from '@material-ui/core'

const useStyle = makeStyles((theme) => ({
  doctorDetail: {
    width: 320,
    height: '100%',
    background: '#f9f9f9',
    backgroundColor: 'white',
    paddingLeft: 10,
  },
  title: {
    fontSize: 17.5,
    color: '#5e5e5e',
    paddingTop: 3,
  },
  mainDetail: {
    paddingTop: 17,
    paddingLeft: 17,
  },
  large: {
    width: theme.spacing(19),
    height: theme.spacing(19),
    border: '5px solid #9DE1FF',
  },
  doctorName: {
    paddingTop: 13,
    paddingLeft: 22,
    fontSize: 20,
    color: '#797979',
  },
  speciality: {
    paddingLeft: 21,
    fontSize: 13,
    color: '#a8a8a8',
  },
  subDetail: {
    paddingLeft: 40,
    paddingTop: 30,
    paddingBottom: 40,
  },
  detail: {
    paddingTop: 30,
  },
  name: {
    color: '#a8a8a8',
    fontSize: 14,
  },
  value: {
    fontSize: 17,
    color: '#716e6e',
  },
  location: {
    paddingTop: 35,
  },
}))

function DoctorDetails({ doctorDetails }) {
  const classes = useStyle()

  return (
    <Box>
      <Box className={classes.doctorDetail}>
        <Typography className={classes.title} variant="h5">
          View Doctor / Hospital Scheduled
        </Typography>
        <Box className={classes.mainDetail}>
          <Avatar
            alt="Remy Sharp"
            src={doctorDetails.photo}
            className={classes.large}
          />
          <Typography className={classes.doctorName} variant="h5">
            {doctorDetails.name}
          </Typography>
          <Typography className={classes.speciality}>
            {doctorDetails.speciality}
          </Typography>
        </Box>
        <Box className={classes.subDetail}>
          <Box>
            <Typography className={classes.name}>Session Timing</Typography>
            <Typography
              className={classes.value}
              variant="h5"
            >{`${doctorDetails.sessionTiming} Minutes`}</Typography>
          </Box>
          <Box className={classes.detail}>
            <Typography className={classes.name}>Fees</Typography>
            <Typography
              className={classes.value}
              variant="h5"
            >{`₹ ${doctorDetails.fee}`}</Typography>
          </Box>
          <Box className={classes.detail}>
            <Typography className={classes.name}>Contact Number</Typography>
            <Typography
              className={classes.value}
              variant="h5"
            >{`+91 ${doctorDetails.mobileNo}`}</Typography>
          </Box>
          <Box className={classes.location}>
            <Typography className={classes.name}>Location</Typography>
            <Typography className={classes.value} variant="h5">
              {doctorDetails.location}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default DoctorDetails
