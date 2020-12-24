import React, { useMemo } from 'react'
import moment from 'moment'
import NumberToWords from 'number-to-words'
import { useHistory } from 'react-router-dom'
import {
  Dialog,
  DialogTitle,
  Typography,
  Box,
  DialogContent,
  Button,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import StarIcon from '@material-ui/icons/Star'
import VerticalAlignBottomOutlinedIcon from '@material-ui/icons/VerticalAlignBottomOutlined'

import useCustomFecth from '../../hooks/useCustomFetch'
import { METHOD, URL } from '../../api'
import useStyle from './useUpcomingAndPastViewStyle'

function UpcomingAndPastView({
  appointmentDetail,
  open,
  startTime,
  endTime,
  preConsultationTime,
  onClose,
  past,
  onCancel,
  onReschedule,
  socket,
  list,
}) {
  const classes = useStyle()

  const history = useHistory()

  const key = useMemo(() => {
    return {
      doctorKey: appointmentDetail.doctorKey,
      appointmentId: appointmentDetail.appointmentId,
    }
  }, [appointmentDetail])

  const [doctorDetails] = useCustomFecth(
    METHOD.GET,
    URL.appointmentDoctorDetails,
    key
  )

  const currentTime = moment().format('DD/MM/YYY HH:mm:ss')

  const appointmentDate = moment(appointmentDetail.appointmentDate).format(
    'DD/MM/YYYY'
  )

  const appointmentDateWithTime = appointmentDate + ' ' + appointmentDetail.startTime

  const date = moment(appointmentDetail.appointmentDate).format('DD MMMM YYYY')

  const doctorName = appointmentDetail.doctorLastName
    ? `${appointmentDetail.doctorFirstName}${' '}${appointmentDetail.doctorLastName}`
    : appointmentDetail.doctorFirstName

  const difference = moment(appointmentDateWithTime, 'DD/MM/YYYY HH:mm:ss').diff(
    moment(currentTime, 'DD/MM/YYYY HH:mm:ss')
  )

  const differenceInDays = moment.duration(difference)

  const days =
    NumberToWords.toWords(differenceInDays.days()).charAt(0).toUpperCase() +
    NumberToWords.toWords(differenceInDays.days()).slice(1)

  const hours =
    NumberToWords.toWords(differenceInDays.hours()).charAt(0).toUpperCase() +
    NumberToWords.toWords(differenceInDays.hours()).slice(1)

  const minutes =
    NumberToWords.toWords(differenceInDays.minutes()).charAt(0).toUpperCase() +
    NumberToWords.toWords(differenceInDays.minutes()).slice(1)

  const cancelDisable =
    doctorDetails?.cancellationDays !== null
      ? differenceInDays.days() >= Number(doctorDetails?.cancellationDays) &&
        differenceInDays.hours() >= Number(doctorDetails?.cancellationHours) &&
        differenceInDays.minutes() >= Number(doctorDetails?.cancellationMins)
        ? false
        : true
      : false
 

  const rescheduleDisable =
    doctorDetails?.rescheduleDays !== null
    ? differenceInDays.days() >= Number(doctorDetails?.rescheduleDays) &&
      differenceInDays.hours() >= Number(doctorDetails?.rescheduleHours) &&
      differenceInDays.minutes() >= Number(doctorDetails?.rescheduleMins)
      ? false
      : true
    : false

  function handleOnClose(event) {
    onCancel(event)
  }

  function handleOnStartConsulation() {
    socket.emit('getPatientTokenForDoctor', appointmentDetail.appointmentId)
    socket.on('videoTokenForPatient', (data) => {
      socket.emit('updateLiveStatusOfUser', { status: 'videoSessionReady' })
      if (data.isToken) {
        socket.emit('updateLiveStatusOfUser', { status: 'videoSessionReady' })
      }
    })
    history.push({
      pathname: '/video-consultation',
      state: appointmentDetail.appointmentId,
      doctorName: doctorName,
      liveStatus: appointmentDetail.liveStatus,
      socket: socket,
      appointmentDetail: appointmentDetail,
      list: list,
    })
  }

  function handleOnCancel(event) {
    onClose(event)
  }

  function handleOnReschedule(event) {
    onReschedule(event)
  }

  return (
    <Box>
      {doctorDetails && (
        <Dialog open={open} className={classes.dialogBox}>
          <DialogTitle className={classes.title}>
            <Box display="flex" className={classes.header}>
              <Typography className={classes.heading} variant="h5">
                Doctor Details
              </Typography>
              <CloseIcon onClick={handleOnClose} className={classes.closeIcon} />
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box display="flex" className={classes.details}>
              <Box>
                <Box display="flex" className={classes.nameAndValuePair}>
                  <Typography className={classes.name}>Email :</Typography>
                  <Typography className={classes.value} variant="h5">
                    {doctorDetails.email}
                  </Typography>
                </Box>
                <Box display="flex" className={classes.nameAndValuePair}>
                  <Typography className={classes.name}>
                    Invite Time Zone :
                  </Typography>
                  <Typography className={classes.value} variant="h5">
                    Indian standard Time
                  </Typography>
                </Box>
                <Box display="flex" className={classes.nameAndValuePair}>
                  <Typography className={classes.name}>Hospital Name : </Typography>
                  <Typography className={classes.value} variant="h5">
                    {doctorDetails.hospitalName}
                  </Typography>
                </Box>
                <Box display="flex" className={classes.time}>
                  <Typography className={classes.name}>Time : </Typography>
                  <Typography
                    className={classes.value}
                    variant="h5"
                  >{`${startTime}${' - '}${endTime}`}</Typography>
                </Box>
              </Box>
              <Box className={classes.rightSide}>
                <Box display="flex" className={classes.nameAndValuePair}>
                  <Typography className={classes.name}>Location : </Typography>
                  <Typography className={classes.value} variant="h5">
                    {doctorDetails.location}
                  </Typography>
                </Box>
                <Box display="flex" className={classes.nameAndValuePair}>
                  <Typography className={classes.name}>Mobile No :</Typography>
                  <Typography className={classes.value} variant="h5">{`${'+91 '}${
                    doctorDetails.mobileNo
                  }`}</Typography>
                </Box>
                <Box display="flex" className={classes.nameAndValuePair}>
                  <Typography className={classes.name}>Date : </Typography>
                  <Typography className={classes.value} variant="h5">
                    {date}
                  </Typography>
                </Box>

                {/* <Box display="grid" className={classes.nameAndValuePair} style={{ width: "0px" }}>
                  <Typography className={classes.name} style={{ paddingBottom: "10px" }} > Upload files </Typography>
                  <AddFile />
                </Box> */}
                {(prescriptionDisplay) ?
                  past && (
                    <Box display="flex" className={classes.prescription}>

                      <Typography className={classes.name}>Prescription : </Typography>
                      <Box display="flex" className={classes.download}>
                        <a className={classes.value}  href={doctorDetails.prescriptionUrl[0]}
                        target="_blank"
                        style={{ color: '#37befa', textDecorationLine: 'none' }}
                        variant="h5">
                          Click here
                      </a>
                        <VerticalAlignBottomOutlinedIcon
                          onClick={doctorDetails.prescriptionUrl[0]}
                          className={classes.downloadIcon}
                        />
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
            {!past && (
              <Box>
                {/* <Box display="flex" className={classes.preConsultaion}>
                  <InfoOutlinedIcon className={classes.infoIcon} />
                  <Typography className={classes.preConsultaionTime}>
                    PreConsultaion starts at <b>{preConsultationTime}</b>. Doctor
                    consultation starts at <b>{startTime}</b>
                  </Typography>
                </Box> */}
                <Box className={classes.button} display="flex">
                  <Button
                    className={rescheduleDisable ? classes.disableReschduleButton : classes.rescheduleButton}
                    onClick={handleOnReschedule}
                    disabled={rescheduleDisable}
                  >
                    <Typography className={rescheduleDisable ? classes.disableRescheduleText : classes.rescheduleText}>
                      RESCHEDULE
                    </Typography>
                  </Button>
                  <Box className={classes.startConsultationButton}>
                    <Typography
                      onClick={handleOnStartConsulation}
                      className={classes.startConsultationText}
                    >
                      START CONSULTATION
                    </Typography>
                  </Box>
                  <Button
                    className={cancelDisable ? classes.disableCancelButton : classes.cancelButton}
                    onClick={handleOnCancel}
                    disabled={cancelDisable}
                  >
                    <Typography className={classes.cancelText}>CANCEL</Typography>
                  </Button>
                </Box>
                <Box display="flex" className={classes.hoursToJoinText}>
                  {(differenceInDays.days() > 0 ||
                    differenceInDays.hours() > 0 ||
                    differenceInDays.minutes() > 0) && (
                    <StarIcon className={classes.starIcon} />
                  )}
                  {differenceInDays.days() > 0 ? (
                    differenceInDays.days() === 1 ? (
                      <Typography
                        className={classes.text}
                      >{`${days} day and ${hours} more hours to join`}</Typography>
                    ) : (
                      <Typography
                        className={classes.text}
                      >{`${days} days and ${hours} more hours to join`}</Typography>
                    )
                  ) : differenceInDays.hours() > 0 ? (
                    differenceInDays.hours() === 1 ||
                    differenceInDays.hours() === 0 ? (
                      <Typography
                        className={classes.text}
                      >{`${hours} more hour to join`}</Typography>
                    ) : (
                      <Typography
                        className={classes.text}
                      >{`${hours} more hours to join`}</Typography>
                    )
                  ) : (
                    differenceInDays.minutes() > 0 &&
                    (differenceInDays.minutes() === 1 ? (
                      <Typography
                        className={classes.text}
                      >{`${minutes} more minute to join`}</Typography>
                    ) : (
                      <Typography
                        className={classes.text}
                      >{`${minutes} more minutes to join`}</Typography>
                    ))
                  )}
                </Box>
              </Box>
            )}
          </DialogContent>
        </Dialog>
      )}
    </Box>
  )
}

export default UpcomingAndPastView
