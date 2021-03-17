import React from 'react'
import { Box, Typography, Avatar } from '@material-ui/core'
import CancelAndRescheduleInfo from './CancelAndRescheduleInfo'

import useStyle from './useDoctorDetailsStyle'

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
            Dr.{doctorDetails.name}
          </Typography>
          <Typography className={classes.speciality}>
            {doctorDetails.speciality}
          </Typography>
        </Box>
        <Box className={classes.subDetail}>
          <Box>
            <Typography className={classes.name}>Session Timing</Typography>
            {doctorDetails.sessionTiming && (
              <Typography
                className={classes.value}
                variant="h5"
              >{`${doctorDetails.sessionTiming} Minutes`}</Typography>
            )}
          </Box>
          <Box className={classes.detail}>
            <Typography className={classes.name}>Fees</Typography>
            <Typography
              className={classes.value}
              variant="h5"
            >{`₹ ${doctorDetails.fee}`}</Typography>
          </Box>
          {/* <Box className={classes.detail}>
            <Typography className={classes.name}>Contact Number</Typography>
            {doctorDetails.mobileNo && (
              <Typography
                className={classes.value}
                variant="h5"
              >{`+91 ${doctorDetails.mobileNo}`}</Typography>
            )}
          </Box> */}
          <Box className={classes.location}>
            <Typography className={classes.name}>Location</Typography>
            <Typography className={classes.value} variant="h5">
              {doctorDetails.location}
            </Typography>
          </Box>
          <Box className={classes.detail}>
            <CancelAndRescheduleInfo doctorDetails={doctorDetails} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default DoctorDetails
