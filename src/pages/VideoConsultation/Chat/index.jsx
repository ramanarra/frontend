import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { IconButton, TextareaAutosize } from '@material-ui/core'
import { MdSend as SendIcon } from 'react-icons/md'

import { setOpenSideBar, setLastRead } from '../../../actions/doctor'
import ChatBubble from './ChatBubble'
import SpecialMessage from './SpecialMessage'
import './style.scss'

function Chat({
  onClose,
  setOpenTopBar,
  setOpenSideBar,
  session,
  messages,
  patientName,
  doctorName,
  appointmentId,
  isSidebarOpen,
  setLastRead,
  ...rest
}) {
  const [currentMessage, setCurrentMessage] = useState('')
  const lastChatBubble = useRef()

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

  useEffect(() => {
    if (isSidebarOpen) {
      if (messages && messages[appointmentId] && !!messages[appointmentId].length) {
        setLastRead(messages[appointmentId].length, appointmentId)
        lastChatBubble.current.scrollIntoView()
      }
    }
  }, [isSidebarOpen, messages])

  const allyProps = {
    patientName,
    doctorName,
    userRole: rest?.userRole,
    ref: lastChatBubble,
  }

  return (
    <div className="openvidu-chat-screen">
      <div className="chat-bubble-container">
        {messages &&
          messages[appointmentId] &&
          !!messages[appointmentId].length &&
          messages[appointmentId].map((text, index) =>
            text.type?.includes('spl') ? (
              <SpecialMessage
                key={index}
                text={text}
                {...allyProps}
                isLast={index === messages[appointmentId].length - 1}
              />
            ) : (
              <ChatBubble
                key={index}
                text={text}
                {...allyProps}
                isLast={index === messages[appointmentId].length - 1}
              />
            )
          )}
      </div>

      <div className="message-box-wrap">
        <TextareaAutosize
          className="message-box"
          value={currentMessage}
          placeholder={`To: ${
            rest?.userRole === 'DOCTOR' ? patientName : "Dr."+doctorName
          }`}
          onChange={handleTextChange}
          onKeyPress={handleKeyPress}
        />
        <IconButton
          className="send-btn-wrap"
          onClick={sendMessage}
          title="Send message"
        >
          <SendIcon className="send-icon" />
        </IconButton>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setOpenSideBar: (data) => dispatch(setOpenSideBar(data)),
    setLastRead: (index, appointmentId) =>
      dispatch(setLastRead(index, appointmentId)),
  }
}

const mapStateToProps = (state) => {
  return {
    session: state.doctor.session,
    messages: state.doctor.messages,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
