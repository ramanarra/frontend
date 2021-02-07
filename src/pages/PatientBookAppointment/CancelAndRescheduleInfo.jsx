import React from 'react'
import { Box, Typography, makeStyles } from '@material-ui/core'
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined'
import InfoOutlined from '@material-ui/icons/InfoOutlined'


const useStyle = makeStyles(() => ({
  container: {
    paddingLeft: '25%',
  },
  cancellationContent: {
    display:"flex",
    alignItems: "center",
    width: 'fit-content',
  },
  rescheduleContent: {
    display:"flex",
    alignItems: "center",
    width: 'fit-content',
    marginTop: 15,
  },
    infoIcon: {
      color: '#345860',
      width: 20,
      fontSize:"15px"
  },
  text: {
    color: '#345860',
    fontSize: 10,
    paddingLeft: 10,
    paddingTop: 3,
  },
}))

function CancelAndRescheduleInfo({ doctorDetails }) {
  const classes = useStyle()
  const cancellationDays =
    doctorDetails.cancellationDays && doctorDetails.cancellationDays !== '0'
      ? `${doctorDetails.cancellationDays} ${'days'} `
      : ''
  const cancellationHours =
    doctorDetails.cancellationHours && doctorDetails?.cancellationHours !== '0'
      ? `${doctorDetails.cancellationHours} ${'hours'} `
      : ''

  const cancellationMins =
    doctorDetails.cancellationMins && doctorDetails.cancellationMins !== '0'
      ? `${doctorDetails.cancellationMins} ${'mins'}`
      : ''

  const cancellation = `${cancellationDays}${cancellationHours}${cancellationMins}`

  const rescheduleDays =
    doctorDetails.rescheduleDays && doctorDetails.rescheduleDays !== '0'
      ? `${doctorDetails.rescheduleDays} ${'days'} `
      : ''
  const rescheduleHours =
    doctorDetails.rescheduleHours && doctorDetails.rescheduleHours !== '0'
      ? `${doctorDetails?.rescheduleHours} ${'hours'} `
      : ''

  const rescheduleMins =
    doctorDetails.rescheduleMins && doctorDetails.rescheduleMins !== '0'
      ? `${doctorDetails.rescheduleMins} ${'mins'}`
      : ''

  const reschedule = `${rescheduleDays}${rescheduleHours}${rescheduleMins}`

  return (
    <Box >
      {cancellation && (
        <Box display="flex" className={classes.cancellationContent}>
          <InfoOutlined className={classes.infoIcon} />
          <Typography className={classes.text}>
            Cancellation allowed for before {cancellation}
          </Typography>
        </Box>
      )}
      {reschedule && (
        <Box display="flex" className={classes.rescheduleContent}>
          <InfoOutlined className={classes.infoIcon} />
          <Typography className={classes.text}>
            Reschedule allowed for before {reschedule}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default CancelAndRescheduleInfo
