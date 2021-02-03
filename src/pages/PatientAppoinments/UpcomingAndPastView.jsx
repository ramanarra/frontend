import React, { useState, useMemo } from 'react'
import moment from 'moment'
import NumberToWords from 'number-to-words'
import { useHistory } from 'react-router-dom'
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import PatientReport from '../PatientReports/PatientReport.jsx'
import SnackBar from '../../components/SnackBar'
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
import pdf from '../../assets/img/pdf.png'
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
  const [opens, setOpens] = useState(false)
  const [item, setItem] = useState(false)
  const [reportFile, setReportFile] = useState()
  const [report, setReport] = useState([])
  let reportFileArray = []
  const [val, setVal] = useState()
  const history = useHistory()
  const appointmentReportArray = useHistory()


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
  const prescriptionDisplay =
    (doctorDetails?.prescriptionUrl && doctorDetails?.prescriptionUrl.length)
      ? true : false

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

  // Upload report code start here
  function handlePopupMsg() {
    setOpens(true)
  }

  function handleClose() {
    setOpens(false)
    setItem(false)
    let image = { name: val, url: reportFile }
    console.log(image)
    setReport([
      ...report,
      image
    ])
    reportFileArray.push(reportFile)

  }
  // Upload report code end here

  function handleOnCancel(event) {
    onClose(event)
  }

  function handleOnReschedule(event) {
    onReschedule(event)
  }

  //Passing appointmentId to patient report
  function handleClick() {
    appointmentReportArray.push({
      pathname: '/patient/reports',
      state: appointmentDetail.appointmentId
    })
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


                {/* <Box display="flex" className={classes.nameAndValuePair}>
                  <Typography className={classes.name}> User Credit : </Typography>
                  <Typography className={classes.value} variant="h5">
                    200
                  </Typography>
                </Box> */}


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

                {/* Upload report */}
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
                  )
                  :
                  <div></div>
                }
                <Box>
                  <Box style={{ display: "flex" }}>
                    <Typography className={classes.name}>Upload Report :</Typography>
                    <Button className="title" onClick={handlePopupMsg} style={{ textTransform: "none", position: "relative", top: "-6px", left: "-10px" }} >
                      <AddCircleOutlineTwoToneIcon />
                    </Button>
                  </Box>
                  <Box style={{ display: "flex", height: "50px", width: "50px" }}>

                    {
                      doctorDetails?.reportDetail?.map((item, index) => {
                        if (index <= 3) {
                          if (item?.fileType?.includes("pdf")) {
                            return (
                              <Box>
                                <img style={{ width: "40px", height: "40px", marginRight: "10px", borderRadius: "8px" }} src={pdf} />
                                <Typography style={{ fontSize: "9px", width: "40px", height: "10px", overflow: "hidden", textOverflow: "clip" }}>{item.fileName}</Typography>
                              </Box>
                            )
                          }
                          else {
                            return (
                              <Box>
                                <img style={{ width: "40px", height: "40px", marginRight: "10px", borderRadius: "8px" }} src={item.reportURL} />
                                <Typography style={{ fontSize: "9px", width: "40px", height: "10px", overflow: "hidden", textOverflow: "clip" }}>{item.fileName}</Typography>
                              </Box>
                            )
                          }
                        }
                      })
                    }
                  </Box>
                  
                  {/* To show the patient reports */}
                  <Box>
                    {
                      doctorDetails?.reportDetail?.length > 4 &&
                      <a onClick={handleClick} style={{ color: "#0bb5ff", fontSize: "12px" }}>View {(doctorDetails?.reportDetail?.length - 4)} more</a>
                    }

                  </Box>
                </Box>
                {
                  opens &&
                  <PatientReport
                    open={opens}
                    setOpen={setOpens}
                    setItem={setItem}
                    appointmentId={appointmentDetail.appointmentId}
                    handleClose={handleClose}
                    setReportFile={setReportFile}
                    setVal={setVal}
                  />
                }
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

      {
        <SnackBar
          openDialog={item}
          message={"Your report added successfully"}
          onclose={handleClose}
          severity={'success'}
        />
      }

    </Box>

  )
}

export default UpcomingAndPastView
