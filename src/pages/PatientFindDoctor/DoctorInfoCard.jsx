import React from 'react'
import { useHistory } from 'react-router-dom'
import { Avatar, Box, Typography, Button, makeStyles } from '@material-ui/core'

const useInfocardStyles = makeStyles((theme) => ({
  container: {
    width: 325,
    marginTop: 20,
    marginRight: 29,
    backgroundColor: 'white',
    padding: '15px 14px 10px 20px',
    borderBottom: '2px solid #0bb5ff',
    boxShadow: '5px 0px 15px 0px #f3eeee',
  },

  large: {
    width: theme.spacing(7.5),
    height: theme.spacing(7.5),
  },

  name: {
    fontSize: 18.5,
    color: '#645f5f',
  },

  desgination: {
    fontSize: 12,
    color: '#c1b6b6',
  },

  hospitalName: {
    fontSize: 10,
    color: '#c1b6b6',
  },

  text: {
    fontSize: 11.5,
    color: '#c8c8c8',
  },

  value: {
    fontSize: 11.5,
    color: '#947f7f',
    fontWeight: 600,
  },

  button: {
    textTransform: 'capitalize',
    fontSize: 10,
    padding: '1px 9px',
    border: '1.5px solid #94dfff',
    color: '#0bb5ff',
    borderRadius: 3,
  },
}))

const DoctorInfoCard = ({ doctorDetail, doctorListInHospital }) => {
  const classes = useInfocardStyles()

  const hisrory = useHistory()

  const doctorKey = doctorDetail.doctorKey

  const doctorLastName = doctorDetail.lastName ? doctorDetail.lastName : ''

  function handleOnClick() {
    localStorage.setItem('doctorId', doctorDetail.doctorId)
    hisrory.push(`/patient/${doctorKey}/book-appointment`)
  }

  function handleHospital(accountKey) {
    doctorListInHospital(accountKey)
  }

  return (
    <Box className={classes.container}>
      <Box display="flex">
        <Avatar
          alt="Remy Sharp"
          src={doctorDetail.photo}
          className={classes.large}
        />

        <Box style={{ marginLeft: 13, marginTop: 7 }}>
          <Box display="flex">
            {!doctorDetail.doctorKey && (
              <Typography className={classes.name}>
                {doctorDetail.hospitalName}
              </Typography>
            )}
            {doctorDetail.doctorKey && (
              <Typography
                className={classes.name}
              >{`${doctorDetail.firstName} ${doctorLastName}`}</Typography>
            )}
          </Box>
          {doctorDetail.doctorKey && (
            <Typography className={classes.desgination}>
              {doctorDetail.speciality}
            </Typography>
          )}
          {doctorDetail.doctorKey && (
            <Typography className={classes.hospitalName}>
              {doctorDetail.hospitalName}
            </Typography>
          )}
        </Box>
      </Box>

      <Box marginTop={3} display="flex">
        {doctorDetail.doctorKey && (
          <Box>
            <Typography className={classes.text}>Fees</Typography>
            <Typography
              className={classes.value}
            >{`₹${doctorDetail.fee}`}</Typography>
          </Box>
        )}
        <Box paddingLeft={3.7}>
          <Typography className={classes.text}>Phone Number</Typography>
          <Typography
            className={classes.value}
          >{`+91 ${doctorDetail.number}`}</Typography>
        </Box>

        <Box paddingLeft={3.7}>
          <Typography className={classes.text}>Location</Typography>
          <Typography className={classes.value}>{doctorDetail.location}</Typography>
        </Box>
      </Box>

      <Box marginTop={2} display="flex" justifyContent="flex-end">
        {!doctorDetail.doctorKey ? (
          <Button
            className={classes.button}
            onClick={() => handleHospital(doctorDetail.accountKey)}
            variant="outlined"
          >
            Our Doctors
          </Button>
        ) : (
          <Button
            className={classes.button}
            onClick={handleOnClick}
            variant="outlined"
          >
            Book Appointment
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default DoctorInfoCard
