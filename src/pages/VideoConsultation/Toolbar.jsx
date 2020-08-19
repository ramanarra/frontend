import React ,{useState} from 'react'
import VideocamIcon from '@material-ui/icons/Videocam'
import VideocamOffIcon from '@material-ui/icons/VideocamOff'
import MicNoneIcon from '@material-ui/icons/MicNone'
// import MicOffIcon from '@material-ui/icons/MicOff'
import CallEndIcon from '@material-ui/icons/CallEnd'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'

import VideoOnIcon from '../../assets/img/video-on.svg'
import MicOnIcon from '../../assets/img/mic-on.svg'
import CallOnIcon from '../../assets/img/call-on.svg'
import AddCallIcon from '../../assets/img/person.png'
import VideoOffIcon from '../../assets/img/video-off.svg'
import MicOffIcon from '../../assets/img/mic-off.svg'
import CallOffIcon from '../../assets/img/call-off.svg'
import AddCallOff from '../../assets/img/add-call-off.svg'

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    zIndex: 5,
    left: 550,
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
    width: 27,
    height: 27,
  },

  addIcon: {
    width: 32,
    height: 32,
    marginLeft: 3,
  },

  topBar: {
    width: 355,
    height: 60,
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: '3px',
    right: '0px',
  },
  groupIcon: {
    fontSize: 44,
    marginLeft: 30,
    cursor: 'pointer',
    marginTop: 5,
    color: '#908e8e',
  },
}))

function Toolbar({
  isVideoActive,
  isAudioActive,
  onVideoStateChange,
  onMuteStateChange,
  onLeaveSession,
  onJoiningPatient,
  patientList,
}) {
  const classes = useStyles()


 
  return (
    <div>
      <div className={classes.root}>
      <IconButton className={classes.iconButton} onClick={onVideoStateChange}>
        {isVideoActive ? (
          <img src={VideoOnIcon} className={classes.videoIcon} />
        ) : (
          <img src={VideoOffIcon} className={classes.videoIcon} />
        )}
      </IconButton>
      <IconButton className={classes.iconButton} onClick={onMuteStateChange}>
        {isAudioActive ? (
          <img src={MicOnIcon} className={classes.videoIcon} />
        ) : (
          <img src={MicOffIcon} className={classes.videoIcon} />
        )}
      </IconButton>

      <IconButton className={classes.iconButton} onClick={onLeaveSession}>
        <img src={CallOnIcon} className={classes.videoIcon} />
      </IconButton>

      <IconButton className={classes.iconButton} onClick >
        <img src={AddCallIcon} className={classes.addIcon} />
      </IconButton>
      </div>
    
    </div>
  )
}

export default Toolbar
