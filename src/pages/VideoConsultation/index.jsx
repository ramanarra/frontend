import React, { useEffect, useState, Fragment } from 'react'
import socketIOClient from 'socket.io-client'
import { OpenVidu } from 'openvidu-browser'
import OpenViduSession from 'openvidu-react'

import UserVideoComponent from './UserVideoComponent'
import ToolBar from './Toolbar'

const ENDPOINT = 'http://dev-api.virujh.com:8081/'

function VideoConsultotion() {
  const [isVideoActive, setIsVideoActive] = useState(true)
  const [isAudioActive, setIsAudioActive] = useState(true)
  const [sessionID, setSessionID] = useState('')
  const [token, setToken] = useState('')

  const [subscribers, setSubscribers] = useState()

  const [socket, setSocket] = useState()

  const [stream, setStream] = useState()
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, {
      transports: ['websocket'],
      jsonp: false,
      query: {
        token: localStorage.getItem('virujhToken'),
      },
    })

    socket.on('connect', function () {
      if (localStorage.getItem('loginUser') === 'doctor') {
        socket.emit('createTokenForDoctor')
      } else {
        socket.emit('getPatientTokenForDoctor', 480)
      }

      socket.emit('getAppointmentListForDoctor')

      socket.on('getDoctorAppointments', (data) => {
        console.log(data)
      })
      socket.on('videoTokenForDoctor', (data) => {
        console.log('called')
        setSessionID(data.sessionId)
        setToken(data.token)
      })

      socket.on('videoTokenForPatient', (data) => {
        console.log('called')
        setSessionID(data.sessionId)
        setToken(data.token)
      })
    })

    setSocket(socket)
  }, [])

  useEffect(() => {
    if (token) {
      console.log(token)
      const openViduClinet = new OpenVidu()

      const session = openViduClinet.initSession()

      session.connect(token).then(() => {
        const publisher = openViduClinet.initPublisher(undefined, {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: true,
          publishVideo: true,
          frameRate: 30,
          insertMode: 'APPEND',
        })
        session.publish(publisher)

        subscribeToStreamCreated(session)
        setStream(publisher)
      })
    }
  }, [token])

  function subscribeToStreamCreated(seion) {
    seion.on('streamCreated', (event) => {
      const subscriber = seion.subscribe(event.stream, undefined)

      console.log(subscriber)
      // var subscribers = this.state.subscribers;

      setSubscribers(subscriber)
    })
  }

  function onVideoStateChange() {
    stream.publishVideo(!stream.stream.videoActive)

    setIsVideoActive(stream.stream.videoActive)
  }

  function onMuteStateChnage() {
    stream.publishAudio(!stream.stream.audioActive)

    setIsAudioActive(stream.stream.audioActive)
  }

  function onLeaveSession() {
    stream.disconnect()
  }

  function onJoiningPatient() {
    socket.emit('createTokenForPatientByDoctor', 480)
  }

  function buttonClick() {
    const value = document.getElementById('input').value

    console.log(value)
    setToken(value)
  }

  return (
    <Fragment>
      <input id="input" />
      <button onClick={buttonClick}>onClick</button>
      {stream && (
        <div style={{ position: 'relative' }}>
          <ToolBar
            isVideoActive={isVideoActive}
            isAudioActive={isAudioActive}
            onVideoStateChange={onVideoStateChange}
            onMuteStateChnage={onMuteStateChnage}
            onLeaveSession={onLeaveSession}
            onJoiningPatient={onJoiningPatient}
          />

          <div style={{ display: 'flex'}}>
          <div>
          <UserVideoComponent stream={1} streamManager={stream} />
          </div>

           <div>
          {subscribers && (
            <UserVideoComponent stream={2}  streamManager={subscribers.stream.streamManager} />
          )}
          </div>

          </div>
        </div>
      )}
    </Fragment>
  )
}

export default VideoConsultotion
