import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Box, Typography, Avatar, Paper, Button } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import CircularProgress from '@material-ui/core/CircularProgress'

import getTimeFormatWithNoon, { getTimeFormat } from '../../lib/dateLib'
import { setOpenSideBar } from '../../actions/doctor'
import useStyle from './usePatientListStyle'
import { useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import AdvertisementImage1 from '../../assets/img/advertisementImages/low-cost-advertising-for-startups.png'
import AdvertisementImage2 from '../../assets/img/advertisementImages/maxresdefault.jpg'
import AdvertisementImage3 from '../../assets/img/advertisementImages/download.png'
import { URL } from '../../api'
import useFetch from '../../hooks/useFetch'

function Item({ i, item }) {
  const classes = useStyle()
  let bgcolor
  i % 2 == 0 ? bgcolor = '#cdd1ce' : bgcolor = '#eaeddd'
  return (
    <div className={classes.advertisement} style={{ backgroundColor: bgcolor }}>
      { item.url != null ?
        <div > <img className={classes.image} src={item.url} /> </div > :
        <div  ><br />
          <div className={classes.adTitle} style={{ float: 'left' }}>{item.name}</div>
          <div className={classes.adCode} style={{ float: 'right' }}>Use Code: {item.code}</div><br />
          <br />
          <div style={{ textAlign: "center" }}>
            <h5>
              {item.content}
            </h5>
          </div>
        </div>}
    </div>
  )
}

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
  setFullScreen,
  setInterChange,
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
        setInterChange(false)
        setFullScreen(false)
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
      setFullScreen(false)
      setInterChange(false)
    }
  }, [isWaiting])

  const { data } = useFetch({
    url: URL.advertisementList
  })
  let items = null
  if (data) {
    items = data.data;
  }
  return (
    <Box>
      {open && (
        <Box>
          <Box className={classes.backButton}>
            <ArrowForwardIosIcon onClick={handleOnClose} className={classes.icon} />
          </Box>
          <Box className={classes.dialog} style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Carousel>
              {items !== null && items.map((item, i) => <Item i={i} item={item} />)}
            </Carousel>
            {patientList &&
              patientList.map((patientDetails, index) => {
                return (
                  <Box
                    display="flex"
                    key={index}
                    style={{ paddingLeft: "23px", paddingRight: "15px" }}
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
            {
              !patientList &&
              <CircularProgress color="primary" className={classes.spinner} />
            }
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

export default connect(null, mapDispatchToProps)(PatientList)
