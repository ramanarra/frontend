import React from 'react'
import { useHistory } from 'react-router-dom'
import { Avatar, Box, Typography, Button } from '@material-ui/core'

import { useInfocardStyles } from './useStyle'
import getTimeFormatWithNoon from '../../../lib/dateLib'
import Profile from '../../../assets/img/profile.png'

const InfoCard = ({ doctorDetails, isRead }) => {
  const classes = useInfocardStyles()
  const hisrory = useHistory()

  function handeOnClick() {
    const { doctorKey } = doctorDetails
    hisrory.push(`/doctors/${doctorKey}/personal-setting`)
  }

  function handleAppointmentsClick() {
    const { doctorKey } = doctorDetails
    hisrory.push(`/appointments/${doctorKey}`)
  }

  return (
    <Box className={classes.container}>
      <Box display="flex" style={{height: 70}}>
        <Avatar
          alt="Remy Sharp"
          src={doctorDetails.photo ? doctorDetails.photo : Profile}
          className={classes.large}
        />

        <Box style={{ marginLeft: 13, marginTop: 7, width: 200 }}>
          <Typography
            className={classes.name}
          >{`${doctorDetails.firstName} ${doctorDetails.lastName}`}</Typography>
          <Typography className={classes.desgination}>
            {doctorDetails.speciality}
          </Typography>
        </Box>
      </Box>

      <Box marginTop={2} display="flex" height={56}>
        <Box width={53}>
          <Typography className={classes.text}>Fees</Typography>
          <Typography
            className={classes.value}
          >{`₹${doctorDetails.fees}`}</Typography>
        </Box>

        <Box paddingLeft={1.1}>
          <Typography className={classes.text}>Today's Appointment</Typography>
          <Box className={classes.appointmentsContent}>
            {doctorDetails.todaysAppointment.map(
              (appointments, index) =>
                appointments && (
                  <Typography key={index} className={classes.appointments}>
                    {getTimeFormatWithNoon(appointments)}
                  </Typography>
                )
            )}
          </Box>
        </Box>

        <Box paddingLeft={2.4}>
          <Typography className={classes.slotText}>Total Available slots</Typography>
          <Typography className={classes.value}>
            {doctorDetails.todaysAvailabilitySeats}
          </Typography>
        </Box>
      </Box>

      <Box marginTop={1.5} textAlign="end" justifyContent="flex-end">
        {isRead && (
          <Box>
            <Button
              className={classes.button}
              onClick={handeOnClick}
              variant="outlined"
            >
              Settings
            </Button>
            <Button
              className={classes.appointmentButton}
              onClick={handleAppointmentsClick}
              variant="outlined"
              style={{ backgroundColor: '#0bb5ff' }}
            >
              Appointments
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default InfoCard
