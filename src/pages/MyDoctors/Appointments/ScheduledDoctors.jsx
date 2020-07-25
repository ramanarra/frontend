import React from 'react'
import classNames from 'classnames'
import { useParams, useHistory } from 'react-router-dom'
import { Box, Typography, makeStyles, Avatar } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    width: '250px',
    background: '#f9f9f9',
    backgroundColor: 'white',
    height: '100%',
    borderRight: '1px solid #ebebeb',
  },
  heading: {
    fontSize: 18,
    paddingTop: '20px',
    paddingLeft: '25px',
    color: '#645f5f',
  },
  photo: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  doctorlist: {
    paddingTop: '17px',
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
    fontSize: '14px',
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

  function handleOnClick(name, doctorKey) {
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
                onClick={() => handleOnClick(doctor.doctorName, doctor.doctorKey)}
              >
                <Avatar className={classes.photo} src={doctor.photo} />
                <Typography className={classes.name}>{doctor.doctorName}</Typography>
              </Box>
            )
          })}
      </Box>
    </Box>
  )
}

export default ScheduledDoctors
