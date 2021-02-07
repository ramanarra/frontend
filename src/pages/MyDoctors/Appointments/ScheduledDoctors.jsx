import React from 'react'
import classNames from 'classnames'
import { useParams, useHistory } from 'react-router-dom'
import { Box, Typography, makeStyles, Avatar } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    width: '18%',
    background: '#f9f9f9',
    backgroundColor: 'white',
    height: '100%',
    borderRight: '1px solid #ebebeb',
  },
  heading: {
    fontSize: '90%',
    paddingTop: '9.5%',
    paddingLeft: '11.5%',
    paddingRight: '11.5%',
    color: '#645f5f',
  },
  photo: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  doctorlist: {
    paddingTop: '8.5%',
  },
  doctor: {
    cursor: 'pointer',
    paddingTop: '12px',
    paddingBottom: '10px',
    paddingLeft: '20px',
    alignItems: 'center',
    height: '35px',
    marginTop: '15px',
  },
  name: {
    paddingLeft: '7px',
    fontSize: '70%',
    color: '#645f5f',
  },
  selecedTab: {
    backgroundColor: '#e6f7ff',
    borderLeft: '2.5px solid #0cb5ff',
  },
}))

const ScheduledDoctors = ({ doctorDetails }) => {
  const classes = useStyles()

  const { id } = useParams()

  const history = useHistory()

  function handleOnClick(doctorKey) {
    history.push(`/appointments/${doctorKey}`)
  }

  return (
    <Box className={classes.container}>
      <Typography className={classes.heading}>Scheduled Doctors</Typography>
      <Box className={classes.doctorlist}>
        {doctorDetails &&
          doctorDetails.map((doctor, index) => {
            return (
              <Box
                key={index}
                className={classNames(classes.doctor, {
                  [classes.selecedTab]: id === doctor.doctorKey,
                })}
                display="flex"
                onClick={() => handleOnClick(doctor.doctorKey)}
              >
                <Avatar className={classes.photo} src={doctor.photo} />
                <Typography className={classes.name}>{`${doctor.firstName} ${doctor.lastName}`}</Typography>
              </Box>
            )
          })}
      </Box>
    </Box>
  )
}

export default ScheduledDoctors
