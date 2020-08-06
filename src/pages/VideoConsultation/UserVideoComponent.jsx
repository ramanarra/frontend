import React, { useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  video: {
    position: 'absolute',
    right: '0',
    minWidth: '100%',
    minHeight: '100%',
    width: 'auto', 
    height: 'auto',
    zIndex: -100,
    backgroundSize: 'cover',
    overflow: 'hidden',
  },
}))

function OpenViduVideoComponent({ streamManager }) {
  const videoRef = useRef()

  const classes = useStyles()

  useEffect(() => {
    if (streamManager && videoRef) {
      streamManager.addVideoElement(videoRef.current)
    }
  }, [streamManager])

  return <video className={classes.video} autoPlay={true} ref={videoRef} />
}

export default OpenViduVideoComponent
