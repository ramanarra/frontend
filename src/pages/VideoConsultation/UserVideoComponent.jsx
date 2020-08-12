import React, { useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  video: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    color: '#ffffff',
    margin: '0',
    padding: '0',
    border: '0',
    fontDize: '100%',
  },
}))

function OpenViduVideoComponent({ streamManager, stream }) {
  const videoRef = useRef()

  const classes = useStyles()

  useEffect(() => {
    if (streamManager && videoRef) {
      streamManager.addVideoElement(videoRef.current)
    }
  }, [streamManager])

  return <video  id={'video-' + stream} className={classes.video} autoPlay={true} ref={videoRef} />
}

export default OpenViduVideoComponent
