import React from 'react'
import VideocamIcon from '@material-ui/icons/Videocam'
import VideocamOffIcon from '@material-ui/icons/VideocamOff'
import MicNoneIcon from '@material-ui/icons/MicNone'
import MicOffIcon from '@material-ui/icons/MicOff'
import CallEndIcon from '@material-ui/icons/CallEnd'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    zIndex: 1,
    left: 400,
    top: 600,
  },

  iconButton: {
    marginLeft: 30,
    background: '#ffffff',
    width: 60,
    height: 60,

    '&:hover': {
      background: '#ffffff',
    },
  },

  videoIcon: {
    width: 25,
    height: 25,
  },
}))

function Toolbar({
  isVideoActive,
  isAudioActive,
  onVideoStateChange,
  onMuteStateChnage,
  onLeaveSession,
  onJoiningPatient,
}) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <IconButton className={classes.iconButton} onClick={onVideoStateChange}>
        {isVideoActive ? (
          <VideocamIcon color="primary" className={classes.videoIcon} />
        ) : (
          <VideocamOffIcon color="primary" className={classes.videoIcon} />
        )}
      </IconButton>
      <IconButton className={classes.iconButton} onClick={onMuteStateChnage}>
        {isAudioActive ? (
          <MicNoneIcon color="primary" className={classes.videoIcon} />
        ) : (
          <MicOffIcon color="primary" className={classes.videoIcon} />
        )}
      </IconButton>

      <IconButton className={classes.iconButton} onClick={onLeaveSession}>
        <CallEndIcon style={{ color: 'red' }} className={classes.videoIcon} />
      </IconButton>

      <div onClick={onJoiningPatient}>Patient Joining</div>
    </div>
  )
}

export default Toolbar
