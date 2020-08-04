import React from 'react'
import { useHistory } from 'react-router-dom'
import { Avatar, Box, Typography, Button } from '@material-ui/core'

import { useInfocardStyles } from './useStyle'

const InfoCard = ({ doctorDetails, isRead }) => {
  const classes = useInfocardStyles()
  const hisrory = useHistory()

  function handeOnClick() {
    const { doctorKey } = doctorDetails
    hisrory.push(`/doctors/${doctorKey}/personal-setting`)
  }

  return (
    <Box className={classes.container}>
      <Box display="flex">
        <Avatar
          alt="Remy Sharp"
          src={doctorDetails.photo}
          className={classes.large}
        />

        <Box style={{ marginLeft: 13, marginTop: 7 }}>
          <Typography
            className={classes.name}
          >{`${doctorDetails.firstName} ${doctorDetails.lastName}`}</Typography>
          <Typography className={classes.desgination}>
            {doctorDetails.speciality}
          </Typography>
        </Box>
      </Box>

      <Box marginTop={3} display="flex">
        <Box>
          <Typography className={classes.text}>Fees</Typography>
          <Typography
            className={classes.value}
          >{`₹${doctorDetails.fees}`}</Typography>
        </Box>

        <Box paddingLeft={3.7}>
          <Typography className={classes.text}>Today's Appoinment</Typography>
          <Box className={classes.appointmentsContent}>
            {doctorDetails.todaysAppointment.map((appointments, index) => (
              <Typography key={index} className={classes.appointments}>
                {appointments}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box paddingLeft={3.7}>
          <Typography className={classes.text}>Total Available slots</Typography>
          <Typography className={classes.value}>
            {doctorDetails.todaysAvailabilitySeats}
          </Typography>
        </Box>
      </Box>

      <Box marginTop={0.5} display="flex" justifyContent="flex-end">
        {isRead && (
          <Button
            className={classes.button}
            onClick={handeOnClick}
            variant="outlined"
          >
            Settings
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default InfoCard
