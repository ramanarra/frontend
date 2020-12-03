import React from 'react'
import { Box, Dialog, DialogContent, makeStyles } from '@material-ui/core'
import Webcam from 'react-webcam'

const useStyle = makeStyles(() => ({
  box: {
    width: 300,
    height: 300,
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
}))
function VideoDialog({ open }) {
  const classes = useStyle()
  return (
    <Box className={classes.box}>
      <Webcam />
    </Box>
  )
}

export default VideoDialog
