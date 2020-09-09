import React from 'react'
import { Box, Dialog, DialogContent, Typography, Button } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import  getTimeFormatWithNoon  from '../../../lib/dateLib'

function WaitingPatientList({ open, patientList, setOpen, handleJoinVideo }) {


    function handleOnClose() {
        setOpen(false)
    }

    function handleOnClick(patient) {
        handleJoinVideo(patient)
    }
  return (
    <Box>
      <Dialog open={open}>
        <DialogContent>
          <Box display="flex">
            <Typography>Waiting Patient List</Typography>
            <CloseIcon onClick={handleOnClose} />
          </Box>
          {patientList &&
            patientList.map((patient, index) => {
              return (
                <Box key={index} display="flex">
                  <img src={patient.photo} />
                  <Box>
                  {patient.lastName ? (
                    <Typography>
                      {patient.firstName}{' '}{patient.lastName}
                    </Typography>
                  ) : (
                    <Typography>{patient.firstName}</Typography>
                  )}
                  <Typography>
                    {getTimeFormatWithNoon(patient.startTime)}{'-'}
                    {getTimeFormatWithNoon(patient.endTime)}
                  </Typography>
                  </Box>
                  <Box>
                      <Button onClick={() => handleOnClick(patient)}>JOIN</Button>
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
