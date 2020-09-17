import React from 'react'
import { useHistory } from 'react-router-dom'
import classNames from 'classnames'
import { Avatar, Box, Typography, Button, makeStyles } from '@material-ui/core'

const useInfocardStyles = makeStyles((theme) => ({
  container: {
    width: 325,
    marginTop: 20,
    marginRight: 27.2,
    backgroundColor: 'white',
    padding: '15px 14px 10px 20px',
    borderBottom: '2px solid #0bb5ff',
    boxShadow: '5px 0px 15px 0px #f3eeee',
  },

  mainDetails: {
    height: 64,
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

  fees: {
    paddingLeft: 5,
    width: 60,
  },

  contactNumber: {
    paddingLeft: 15,
  },

  hospital: {
    marginLeft: 55,
  },

  location: {
    paddingLeft: 26,
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

  hospitalButton: {
    textTransform: 'capitalize',
    fontSize: 13,
    padding: '1px 15px',
    border: '1.5px solid #94dfff',
    backgroundColor: '#0bb5ff',
    color: '#f7f7f7',
    borderRadius: 3,
  },
}))

const DoctorInfoCard = ({ doctorDetail, doctorListInHospital, isHospital }) => {
  const classes = useInfocardStyles()

  const hisrory = useHistory()

  const doctorKey = doctorDetail.doctorKey

  const doctorLastName = doctorDetail.lastName ? doctorDetail.lastName : ''

  function handleOnClick() {
    localStorage.setItem('doctorId', doctorDetail.doctorId)
    hisrory.push(`/patient/${doctorKey}/book-appointment`)
  }

  function handleHospital(accountKey, hospitalName) {
    doctorListInHospital(accountKey, hospitalName)
  }

  return (
    <Box className={classes.container}>
      <Box display="flex" className={classes.mainDetails}>
        <Avatar
          alt="Remy Sharp"
          src={doctorDetail.photo}
          className={classes.large}
        />

        <Box style={{ marginLeft: 13 }}>
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
          {doctorDetail.doctorKey && !isHospital && (
            <Typography className={classes.hospitalName}>
              {doctorDetail.hospitalName}
            </Typography>
          )}
        </Box>
      </Box>

      <Box style={{ marginTop: 30 }} display="flex">
        {doctorDetail.doctorKey && (
          <Box className={classes.fees}>
            <Typography className={classes.text}>Fees</Typography>
            <Typography
              className={classes.value}
            >{`₹${doctorDetail.fee}`}</Typography>
          </Box>
        )}
        <Box
          paddingLeft={4}
          className={classNames(classes.contactNumber, {
            [classes.hospital]: !doctorDetail.doctorKey,
          })}
        >
          <Typography className={classes.text}>Contact Number</Typography>
          {doctorDetail.number && (
            <Typography
              className={classes.value}
            >{`+91 ${doctorDetail.number}`}</Typography>
          )}
        </Box>

        <Box paddingLeft={4} className={classes.location}>
          <Typography className={classes.text}>Location</Typography>
          <Typography className={classes.value}>{doctorDetail.location}</Typography>
        </Box>
      </Box>

      <Box marginTop={2} display="flex" justifyContent="flex-end">
        {!doctorDetail.doctorKey ? (
          <Button
            className={classes.hospitalButton}
            onClick={() =>
              handleHospital(doctorDetail.accountKey, doctorDetail.hospitalName)
            }
            variant="outlined"
            style={{ backgroundColor: '#0bb5ff' }}
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
