import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Box, Typography, Avatar, makeStyles } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

import getTimeFormatWithNoon, { getTimeFormat } from '../../lib/dateLib'
import {setOpenSideBar} from '../../actions/doctor'
import useStyle from './usePatientListStyle'

function PatientList({
  patientList,
  open,
  onClose,
  onJoiningPatient,
  presentAppointmentId,
  AddNextPatient,
  nextPatientDetails,
  clickByDoctor,
  waitingPatient,
  isWaiting,
  waitingIndex,
  count,
  setCount,
  id,
  setOpenTopBar,
  setOpenSideBar,
}) {
  const classes = useStyle()

  function handleOnClose(event) {
    onClose(event)
    setOpenTopBar(false)
    setOpenSideBar(false)
  }

  const handleOnPatientJoining = (appointmentId, firstName, lastName, index) => {
    if (presentAppointmentId !== appointmentId) {
      if (presentAppointmentId) {
        nextPatientDetails({
          appointmentId: appointmentId,
          firstName: firstName,
          lastName: lastName,
          index: index,
        })
        clickByDoctor()
        AddNextPatient()
      } else {
        onJoiningPatient(appointmentId, firstName, lastName, index)
      }
    }
  }

  useEffect(() => {
    if (isWaiting && count === 0) {
      onJoiningPatient(
        waitingPatient.appointmentId,
        waitingPatient.firstName,
        waitingPatient.lastName,
        waitingIndex
      )
      setCount(1)
    }
  }, [isWaiting])


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
                      [classes.selecedTab]:
                        presentAppointmentId === patientDetails.appointmentId,
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
                    <Box>
                      <Avatar src={patientDetails.photo} className={classes.photo} />
                      {(patientDetails.status === 'paused' && patientDetails.patientLiveStatus === 'online') ? (
                        <FiberManualRecordIcon className={classes.pausedIcon} />
                      ) : (
                        patientDetails.patientLiveStatus &&
                        ((patientDetails.patientLiveStatus === 'online' && (
                          <FiberManualRecordIcon className={classes.onlineStatus} />
                        )) ||
                          (patientDetails.patientLiveStatus === 'offline' && (
                            <FiberManualRecordIcon
                              className={classes.offlineStatus}
                            />
                          )) ||
                          (patientDetails.patientLiveStatus ===
                            'videoSessionReady' && (
                            <FiberManualRecordIcon
                              className={classes.videoSessionReady}
                            />
                          )) ||
                          (patientDetails.patientLiveStatus === 'inSession' && (
                            <FiberManualRecordIcon className={classes.inSession} />
                          )))
                      )}
                    </Box>
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
                        {id === patientDetails.appointmentId && (
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

const mapDispatchToProps = (dispatch) => {
  return {
    setOpenSideBar: (data) => dispatch(setOpenSideBar(data)),
  }
}

export default connect(null,mapDispatchToProps)(PatientList)
