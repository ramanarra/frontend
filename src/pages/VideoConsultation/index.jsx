import React from 'react'
import OpenViduSession from 'openvidu-react'

function VideoConsultotion() {
  function handlerJoinSessionEvent() {
    console.log('Join session')
  }

  function handlerLeaveSessionEvent() {
    console.log('Leave session')
  }

  function handlerErrorEvent() {
    console.log('Leave session')
  }

  return (
    <OpenViduSession
      id="opv-session"
      //   sessionName={mySessionId}
      //   user={myUserName}
      //   token={token}
      joinSession={handlerJoinSessionEvent}
      leaveSession={handlerLeaveSessionEvent}
      error={handlerErrorEvent}
    />
  )
}

export default VideoConsultotion
