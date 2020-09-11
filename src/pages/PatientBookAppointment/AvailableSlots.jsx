import React, { useState } from 'react'
import classNames from 'classnames'
import { Box, makeStyles, Button, Typography } from '@material-ui/core'
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded'
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined'

import getTimeFormatWithNoon from '../../lib/dateLib'

const useStyle = makeStyles(() => ({
  availableSlots: {
    marginTop: 145,
    paddingLeft: 20,
    height: 305,
    overflowY: 'auto',
  },
  time: {
    width: 100,
    border: '1.5px solid #dadada',
    marginLeft: 13,
    marginBottom: 15,
    borderRadius: 3,
    '&:hover': {
      backgroundColor: '#54cbff',
      border: '1.5px solid #54cbff',
    },
  },
  timeText: {
    fontSize: 12.3,
    paddingTop: 2,
    color: '#6a6969',
    '&:hover': {
      color: '#ffffff',
    },
  },
  selectedTab: {
    backgroundColor: '#0bb5ff',
    border: '1.5px solid #0bb5ff',
  },
  selectedText: {
    color: '#ffffff',
    fontSize: 13,
    paddingTop: 2,
  },
  icon: {
    width: 16,
    color: '#ffffff',
    marginLeft: 6,
  },
  cancellationContent: {
    backgroundColor: '#f7fcff',
    padding: 10,
    width: 'fit-content',
    marginLeft: 35,
    marginTop: 15,
  },
  rescheduleContent: {
    backgroundColor: '#f7fcff',
    padding: 10,
    width: 'fit-content',
    marginLeft: 35,
    marginTop: 15,
  },
  reportIcon: {
    color: '#345860',
    width: 20,
  },
  text: {
    color: '#345860',
    fontSize: 13,
    paddingLeft:10,
    paddingTop: 3,
  },
}))

function AvailableSlots({ availableSlots, handleSlotTiming, doctorDetails, time }) {
  const classes = useStyle()

  const handleOnClick = (slot) => {
    handleSlotTiming(slot)
  }

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
      <Box className={classes.availableSlots}>
        {availableSlots &&
          availableSlots.map((slot, index) => {
            return (
              <Button
                className={classNames(classes.time, {
                  [classes.selectedTab]: time.start === slot.start,
                })}
                onClick={() => handleOnClick(slot)}
                key={index}
              >
                {time.start === slot.startTime ? (
                  <Box display="flex">
                    <Typography className={classes.selectedText}>
                      {getTimeFormatWithNoon(slot.startTime)}
                    </Typography>
                    <CheckCircleRoundedIcon className={classes.icon} />
                  </Box>
                ) : (
                  <Typography className={classes.timeText}>
                    {getTimeFormatWithNoon(slot.startTime)}
                  </Typography>
                )}
              </Button>
            )
          })}
      </Box>
      {
        cancellation && 
        <Box display="flex" className={classes.cancellationContent}>
          <ReportProblemOutlinedIcon className={classes.reportIcon} />
          <Typography className={classes.text}>Cancellation allowed for within {cancellation}</Typography>
        </Box>
      }
      {
        reschedule &&
        <Box display="flex" className={classes.rescheduleContent}>
          <ReportProblemOutlinedIcon className={classes.reportIcon} />
          <Typography className={classes.text}>Reschedule allowed for within {reschedule}</Typography>
        </Box>
      }
    </Box>
  )
}

export default AvailableSlots
