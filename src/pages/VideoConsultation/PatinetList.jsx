import React, {useState} from 'react'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  Avatar,
  makeStyles,
} from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import getTimeFormatWithNoon, { getTimeFormat } from '../../lib/dateLib'


const useStyle = makeStyles((theme) => ({
  dialog: {
    position: 'absolute',
    right: 0,
    margin: 0,
    top: 56,
    backgroundColor: '#ffffff',
    width: 355,
    padding: '25px 15px 10px 23px',
    height: 'calc(100% - 63px)',
    overflowY: 'auto',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    position: 'absolute',
    top: 58,
    right: 348,
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  },
  patientDetails: {
    paddingBottom: 8,
    paddingTop: 8,
    cursor: 'pointer',
  },
  icon: {
    marginTop: 7.5,
    marginLeft: 8,
    color: '#a8a8a8',
  },
  photo: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  detail: {
    paddingTop: 4.5,
    paddingLeft: 15,
  },
  firstName: {
    fontSize: 13,
    color: '#312f2f',
  },
  lastName: {
    paddingLeft: 2,
    fontSize: 13,
    color: '#312f2f',
  },
  next: {
    fontSize: 9,
    color: '#16c5ed',
    paddingLeft: 5,
    paddingTop: 2.5,
  },
  meetingTime: {
    paddingTop: 5,
    fontSize: 10,
    color: '#a8a8a8',
  },
  selecedTab: {
    backgroundColor: '#e6f7ff',
    borderLeft: '3px solid #20cfe1',
    paddingLeft: 10,
  }
}))

function PatientList({ patientList, open, onClose, onJoiningPatient, endCall, appointmentId }) {
  const classes = useStyle()


  function handleOnClose(event) {
    onClose(event)
  }

  const handleOnPatientJoining = (appointmentId, firstName, lastName, index) => {
    onJoiningPatient(appointmentId, firstName, lastName, index)
  }




  return (
    <Box>
      {open && (
        <Box>
          <Box className={classes.backButton}>
            <ArrowForwardIosIcon onClick={handleOnClose} className={classes.icon} />
          </Box>
          <Box className={classes.dialog}>
            {patientList &&
              patientList.map((patientDetails, index) => {
                return (
                  <Box
                    display="flex"
                    key={index}
                    className={classNames(classes.patientDetails, {
                      [classes.selecedTab]: appointmentId === patientDetails.appointmentId,
                    })}
                    onClick={() =>
                      handleOnPatientJoining(
                        patientDetails.appointmentId,
                        patientDetails.firstName,
                        patientDetails.lastName,
                        index
                      )
                    }
                  >
                    <Avatar src={patientDetails.photo} className={classes.photo} />
                    <Box className={classes.detail}>
                      <Box display="flex">
                        <Typography className={classes.firstName} variant="h5">
                          {patientDetails.firstName}
                        </Typography>
                        {patientDetails.lastName && (
                          <Typography className={classes.lastName} variant="h5">
                            {patientDetails.lastName}
                          </Typography>
                        )}
                        {index === 0 && (
                          <Typography className={classes.next}>NEXT</Typography>
                        )}
                      </Box>
                      <Box display="flex">
                        <Typography
                          className={classes.meetingTime}
                        >{`${'Meeting Time: '}${getTimeFormat(
                          patientDetails.startTime
                        )}${' to '}${getTimeFormatWithNoon(
                          patientDetails.endTime
                        )}`}</Typography>
                      </Box>
                    </Box>
                  </Box>
                )
              })}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default PatientList
