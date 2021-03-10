import React from 'react'
import { useHistory } from 'react-router-dom'
import classNames from 'classnames'
import { Avatar, Box, Typography, Button } from '@material-ui/core'
import useStyle from './useInfoCardStyle'

const DoctorInfoCard = ({ doctorDetail, doctorListInHospital, isHospital }) => {
  const classes = useStyle()

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

        <Box style={{ marginLeft: '4.5%' }}>
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

      <Box style={{ marginTop: '10.3%' }} display="flex">
        {doctorDetail.doctorKey && (
          <Box className={classes.fees}>
            <Typography className={classes.text}>Fees</Typography>
            <Typography
              className={classes.value}
            >{`₹${doctorDetail.fee}`}</Typography>
          </Box>
        )}
        {/* <Box
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
        </Box> */}

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
