import React from 'react'
import { Box, Typography, makeStyles } from '@material-ui/core'
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined'

const useStyle = makeStyles(() => ({
  container: {
    paddingLeft: '25%',
  },
  cancellationContent: {
    backgroundColor: '#f7fcff',
    padding: 10,
    width: 'fit-content',
  },
  rescheduleContent: {
    backgroundColor: '#f7fcff',
    padding: 10,
    width: 'fit-content',
    marginTop: 15,
  },
  reportIcon: {
    color: '#345860',
    width: 20,
  },
  text: {
    color: '#345860',
    fontSize: 13,
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
    <Box className={classes.container}>
      {cancellation && (
        <Box display="flex" className={classes.cancellationContent}>
          <ReportProblemOutlinedIcon className={classes.reportIcon} />
          <Typography className={classes.text}>
            Cancellation allowed for before {cancellation}
          </Typography>
        </Box>
      )}
      {reschedule && (
        <Box display="flex" className={classes.rescheduleContent}>
          <ReportProblemOutlinedIcon className={classes.reportIcon} />
          <Typography className={classes.text}>
            Reschedule allowed for before {reschedule}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default CancelAndRescheduleInfo
