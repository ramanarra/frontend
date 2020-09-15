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
  makeStyles,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import StarIcon from '@material-ui/icons/Star'
import VerticalAlignBottomOutlinedIcon from '@material-ui/icons/VerticalAlignBottomOutlined'

import useCustomFecth from '../../hooks/useCustomFetch'
import { METHOD, URL } from '../../api'

const useStyle = makeStyles(() => ({
  dialogBox: {
    height: 900,
    '& .MuiDialog-paper': {
      maxWidth: 950,
    },
  },
  title: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6a6a6a',
  },
  heading: {
    paddingLeft: 310,
    fontSize: 20,
  },
  closeIcon: {
    marginLeft: 340,
    marginBottom: 7,
    cursor: 'pointer',
  },
  details: {
    paddingLeft: 75,
  },
  rightSide: {
    paddingLeft: 68,
  },
  name: {
    fontSize: 16,
    color: '#a8a8a8',
  },
  value: {
    fontSize: 16,
    paddingTop: 2,
    paddingLeft: 5,
  },
  nameAndValuePair: {
    paddingBottom: 30,
  },
  time: {
    paddingBottom: 13,
  },
  download: {
    color: '#37befa',
    cursor: 'pointer',
  },
  downloadIcon: {
    width: 18,
  },
  prescription: {
    paddingBottom: 35,
  },
  preConsultaion: {
    paddingLeft: 68,
  },
  infoIcon: {
    width: 18,
    color: '#37befa',
  },
  preConsultaionTime: {
    color: '#37befa',
    paddingLeft: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 180px',
    paddingTop: 30,
    paddingBottom: 10,
  },
  startConsultationButton: {
    padding: '6px 20px',
    backgroundColor: '#0bb5ff',
    borderRadius: 17,
    textAlign: 'center',
    cursor: 'pointer',
    marginRight: 15,
  },
  startConsultationText: {
    fontSize: 10,
    color: '#f7f7f7',
    paddingTop: 2,
  },
  hoursToJoinText: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    paddingLeft: 13,
  },
  starIcon: {
    width: 10,
    color: '#f33b3b',
    marginTop: -5,
  },
  text: {
    fontSize: 16.5,
    color: '#a8a8a8',
  },
  rescheduleButton: {
    marginRight: 15,
    padding: '5px 40px',
    borderRadius: 17,
    border: '1.5px solid #0bb5ff',
    cursor: 'pointer',
  },
  rescheduleText: {
    fontSize: 10.5,
    color: '0bb5ff',
  },
  cancelButton: {
    padding: '6px 47px',
    borderRadius: 17,
    backgroundColor: '#e4e3e3',
    cursor: 'pointer',
  },
  cancelText: {
    fontSize: 10.5,
    color: '#7a7979',
  },
}))

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
                {past && (
                  <Box display="flex" className={classes.prescription}>
                    <Typography className={classes.name}>Prescription : </Typography>
                    <Box display="flex" className={classes.download}>
                      <Typography className={classes.value} variant="h5">
                        Click here
                      </Typography>
                      <VerticalAlignBottomOutlinedIcon
                        className={classes.downloadIcon}
                      />
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
                  <Box
                    className={classes.rescheduleButton}
                    onClick={handleOnReschedule}
                  >
                    <Typography className={classes.rescheduleText}>
                      RESCHEDULE
                    </Typography>
                  </Box>
                  <Box className={classes.startConsultationButton}>
                    <Typography
                      onClick={handleOnStartConsulation}
                      className={classes.startConsultationText}
                    >
                      START CONSULTATION
                    </Typography>
                  </Box>
                  <Box className={classes.cancelButton} onClick={handleOnCancel}>
                    <Typography className={classes.cancelText}>CANCEL</Typography>
                  </Box>
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
