import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'

import VideoOnIcon from '../../assets/img/video-on.svg'
import MicOnIcon from '../../assets/img/mic-on.svg'
import CallOnIcon from '../../assets/img/call-on.svg'
import AddCallIcon from '../../assets/img/person.png'
import VideoOffIcon from '../../assets/img/video-off.svg'
import MicOffIcon from '../../assets/img/mic-off.svg'
import InterChangeIcon from '../../assets/img/inter-change.svg'
import FullscreenIcon from '../../assets/img/full-screen.svg'
import NonAvailabilityModal from './NonAvailabilityModal'
import LeaveCallModal from './LeaveCallModal'
import useStyle from './useToolBarStyle'

function Toolbar({
  isVideoActive,
  isAudioActive,
  onVideoStateChange,
  onMuteStateChange,
  onLeaveSession,
  AddNextPatient,
  videoAvailability,
  audioAvailability,
  subscribers,
  isFullScreen,
  handleOnFullScreen,
  handleOnInterChange,
  socket,
}) {
  const classes = useStyle()

  const [open, setOpen] = useState(false)

  const [name, setName] = useState('')

  const [openLeaveModal, setOpenLeaveModal] = useState(false)

  function handleOnClick(name) {
    setOpen(true)
    setName(name)
  }

  function handleOnLeave() {
    if (localStorage.getItem('loginUser') === 'doctor') {
      setOpenLeaveModal(true)
    } else {
      onLeaveSession()
    }
  }

  return (
    <div>
      <div className={isFullScreen ? classes.rootForFullScreen : classes.root}>
        {isFullScreen && (
          <IconButton className={classes.iconButton} onClick={handleOnInterChange}>
            <img src={InterChangeIcon} className={classes.videoIcon} />
          </IconButton>
        )}
        {videoAvailability ? (
          <IconButton className={classes.iconButton} onClick={onVideoStateChange}>
            {isVideoActive ? (
              <img src={VideoOnIcon} className={classes.videoIcon} />
            ) : (
              <img src={VideoOffIcon} className={classes.videoIcon} />
            )}
          </IconButton>
        ) : (
          <IconButton
            className={classes.iconButton}
            onClick={() => handleOnClick('Camera')}
          >
            <img src={VideoOffIcon} className={classes.videoIcon} />
          </IconButton>
        )}

        {audioAvailability ? (
          <IconButton className={classes.iconButton} onClick={onMuteStateChange}>
            {isAudioActive ? (
              <img src={MicOnIcon} className={classes.videoIcon} />
            ) : (
              <img src={MicOffIcon} className={classes.videoIcon} />
            )}
          </IconButton>
        ) : (
          <IconButton
            className={classes.iconButton}
            onClick={() => handleOnClick('Audio')}
          >
            <img src={MicOffIcon} className={classes.videoIcon} />
          </IconButton>
        )}

        <IconButton className={classes.iconButton} onClick={handleOnLeave}>
          <img src={CallOnIcon} className={classes.videoIcon} />
        </IconButton>
        {localStorage.getItem('loginUser') === 'doctor' && (
          <IconButton className={classes.iconButton} onClick={AddNextPatient}>
            <img src={AddCallIcon} className={classes.addIcon} />
          </IconButton>
        )}
        {subscribers.length > 0 && (
          <IconButton className={classes.iconButton} onClick={handleOnFullScreen}>
            <img src={FullscreenIcon} className={classes.videoIcon} />
          </IconButton>
        )}
      </div>
      {open && <NonAvailabilityModal open={open} onClose={setOpen} name={name} />}
      {openLeaveModal && (
        <LeaveCallModal
          open={openLeaveModal}
          setOpenLeaveModal={setOpenLeaveModal}
          onLeaveSession={onLeaveSession}
          socket={socket}
        />
      )}
    </div>
  )
}

export default Toolbar
