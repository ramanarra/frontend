import React from 'react'
import { Box, Dialog, DialogContent, Typography, Button, makeStyles, Avatar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import  getTimeFormatWithNoon  from '../../../lib/dateLib'

const useStyle = makeStyles((theme) => ({
  waitingBox: {
    '& .MuiDialog-paper': {
      maxWidth: 500,
    },
  },
  header: {
    paddingBottom: 10,
  },
  heading: {
    fontSize: 17,
  },
  closeIcon: {
    marginLeft: 95,
    cursor: 'pointer',
  },
  waitingList: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  photo: {
    width: theme.spacing(5.5),
    height: theme.spacing(5.5),
  },
  detail: {
    paddingLeft: 13,
    width: 160,
  },
  name: {
    fontSize: 16,
  },
  time: {
    fontSize: 13,
  },
  joinButton: {
    padding: 2,
    marginTop: 7,
    border: '1px solid #0bb5ff',
    color: '#0bb5ff',
  },
}))

function WaitingPatientList({ open, patientList, setOpen, handleJoinVideo, setCount, timer }) {

    const classes = useStyle()

    function handleOnClose() {
        clearInterval(timer)
        setCount(1)
        setOpen(false)
    }

    function handleOnClick(patient) {
        handleJoinVideo(patient)
    }
  return (
    <Box>
      <Dialog open={open} className={classes.waitingBox}>
        <DialogContent>
          <Box display="flex" className={classes.header}>
            <Typography className={classes.heading} variant="h5">Waiting Patient List</Typography>
            <CloseIcon onClick={handleOnClose} className={classes.closeIcon} />
          </Box>
          {patientList &&
            patientList.map((patient, index) => {
              return (
                <Box key={index} display="flex" className={classes.waitingList}>
                  <Avatar src={patient.photo} className={classes.photo} />
                  <Box className={classes.detail}>
                  {patient.lastName ? (
                    <Typography className={classes.name}>
                      {patient.firstName}{' '}{patient.lastName}
                    </Typography>
                  ) : (
                    <Typography className={classes.name}>{patient.firstName}</Typography>
                  )}
                  <Typography className={classes.time}>
                    {getTimeFormatWithNoon(patient.startTime)}{'-'}
                    {getTimeFormatWithNoon(patient.endTime)}
                  </Typography>
                  </Box>
                  <Box className={classes.button}>
                      <Button onClick={() => handleOnClick(patient)} className={classes.joinButton}>JOIN</Button>
                  </Box>
                </Box>
              )
            })}
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default WaitingPatientList
