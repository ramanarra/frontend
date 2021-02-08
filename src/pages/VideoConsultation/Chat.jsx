import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Box, TextareaAutosize, TextField, Typography } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import sentIcon from '../../assets/img/sent-icon.svg'
import { setOpenSideBar } from '../../actions/doctor'
import usestyle from './useChatStyle'

function Chat({
  onClose,
  setOpenTopBar,
  setOpenSideBar,
  session,
  messages,
  patientName,
  doctorName,
}) {
  const classes = usestyle()

  const [currentMessage, setCurrentMessage] = useState('')

  function handleOnClose() {
    onClose()
    setOpenTopBar(false)
    setOpenSideBar(false)
  }

  function handleTextChange(event) {
    setCurrentMessage(event.target.value)
  }

  function sendMessage() {
    session
      .signal({
        data: currentMessage, // Any string (optional)
        to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: 'my-chat', // The type of message (optional)
      })
      .then(() => {
        setCurrentMessage('')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      sendMessage()
    }
  }

  return (
    <Box>
      <Box className={classes.backButton}>
        <ArrowForwardIosIcon onClick={handleOnClose} className={classes.icon} />
      </Box>
      <Box className={classes.container}>
        <Box className={classes.messageBox}>
          <TextareaAutosize
            className={classes.text}
            value={currentMessage}
            placeholder="send message"
            onChange={handleTextChange}
            onKeyPress={handleKeyPress}
          />
          <img
            src={sentIcon}
            position="end"
            className={classes.sentIcon}
            onClick={sendMessage}
          />
        </Box>
        <Box className={classes.messageContainer}>
          {messages &&
            messages.length > 0 &&
            messages.map((text, index) => {
              return (
                <Box
                  key={index}
                  className={text.from === 'user' && classes.senderHeader}
                >
                  <Box
                    className={
                      text.from === 'user' ? classes.sender : classes.receiver
                    }
                  >
                    <Box
                      className={
                        classes[text.from === 'user' ? 'uNameDoc' : 'uNamePatient']
                      }
                    >
                      {text.from === 'user' ? patientName : doctorName}
                    </Box>
                    <Typography className={classes.textMessage}>
                      {text.message}
                    </Typography>
                  </Box>
                </Box>
              )
            })}
        </Box>
      </Box>
    </Box>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setOpenSideBar: (data) => dispatch(setOpenSideBar(data)),
  }
}

const mapStateToProps = (state) => {
  return {
    session: state.doctor.session,
    messages: state.doctor.messages,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
