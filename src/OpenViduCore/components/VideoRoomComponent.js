import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import './VideoRoomComponent.css'
import { OpenVidu, LocalRecorder } from 'openvidu-browser'
import StreamComponent from './stream/StreamComponent'
import DialogExtensionComponent from './dialog-extension/DialogExtension'
import ChatComponent from './chat/ChatComponent'

import OpenViduLayout from '../layout/openvidu-layout'
import UserModel from '../models/user-model'
import ToolbarComponent from './toolbar/ToolbarComponent'
import { setSession, setMessages, clearMessages } from '../../actions/doctor'

var localUser = new UserModel()

class VideoRoomComponent extends Component {
  constructor(props) {
    super(props)
    console.log("OpenViduCore:VideoRoomComponent constructor");
    this.hasBeenUpdated = false
    this.layout = new OpenViduLayout()
    let sessionName = this.props.sessionName ? this.props.sessionName : 'SessionA'
    let userName = this.props.user
      ? this.props.user
      : 'OpenVidu_User' + Math.floor(Math.random() * 100);
    this.remotes = [];
    this.localUserAccessAllowed = false;  
    this.state = {
      mySessionId: sessionName,
      myUserName: userName,
      session: undefined,
      localUser: undefined,
      subscribers: [],
      chatDisplay: 'none',
      messageDetail: [],
    }

    this.joinSession = this.joinSession.bind(this)
    this.leaveSession = this.leaveSession.bind(this)
    this.onbeforeunload = this.onbeforeunload.bind(this)
    this.updateLayout = this.updateLayout.bind(this)
    this.camStatusChanged = this.camStatusChanged.bind(this)
    this.micStatusChanged = this.micStatusChanged.bind(this)
    this.nicknameChanged = this.nicknameChanged.bind(this)
    this.toggleFullscreen = this.toggleFullscreen.bind(this)
    this.screenShare = this.screenShare.bind(this)
    this.stopScreenShare = this.stopScreenShare.bind(this)
    this.closeDialogExtension = this.closeDialogExtension.bind(this)
    this.toggleChat = this.toggleChat.bind(this)
    this.checkNotification = this.checkNotification.bind(this)
    this.checkSize = this.checkSize.bind(this)
  }

  componentDidMount() {
    console.log("OpenViduCore:VideoRoomComponent componentDidMount");
    const openViduLayoutOptions = {
      maxRatio: 3 / 4, // The narrowest ratio that will be used (default 2x3)
      minRatio: 3 / 4, // The widest ratio that will be used (default 16x9)
      fixedRatio: true, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
      bigClass: 'OV_big', // The class to add to elements that should be sized bigger
      bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
      bigFixedRatio: true, // fixedRatio for the big ones
      bigMaxRatio: 3 / 4, // The narrowest ratio to use for the big elements (default 2x3)
      bigMinRatio: 3 / 4, // The widest ratio to use for the big elements (default 16x9)
      bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
      animate: true, // Whether you want to animate the transitions
    }

    this.layout.initLayoutContainer(
      document.getElementById('layout'),
      openViduLayoutOptions
    )
    window.addEventListener('beforeunload', this.onbeforeunload)
    window.addEventListener('resize', this.updateLayout)
    window.addEventListener('resize', this.checkSize)
    this.joinSession()
    localUser.setVideoActive(this.props.isVideoStatus)
    localUser.setAudioActive(this.props.isAudioStatus)
  }

  componentWillUnmount() {
    console.log("OpenViduCore:VideoRoomComponent componentWillUnmount");
    window.removeEventListener('beforeunload', this.onbeforeunload)
    window.removeEventListener('resize', this.updateLayout)
    window.removeEventListener('resize', this.checkSize)
    this.leaveSession()
  }

  onbeforeunload(event) {
    console.log("OpenViduCore:VideoRoomComponent onbeforeunload");
    this.leaveSession()
  }

  joinSession() {
    console.log("OpenViduCore:VideoRoomComponent joinsession");
    this.OV = new OpenVidu()

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        this.subscribeToStreamCreated()

        this.connectToSession()
      }
    )
  }

  connectToSession() {
    console.log("OpenViduCore:VideoRoomComponent connectToSession");
    if (this.props.token !== undefined) {
      this.connect(this.props.token)
    }
  }

  connect(token) {
    console.log("OpenViduCore:VideoRoomComponent connect:");
    this.state.session
      .connect(token, { clientData: this.state.myUserName })
      .then(() => {
        this.connectWebCam()
      })
      .catch((error) => {
        if (this.props.error) {
          this.props.error({
            error: error.error,
            messgae: error.message,
            code: error.code,
            status: error.status,
          })
        }
        alert('There was an error connecting to the session:', error.message)
      })
  }

  connectWebCam() {
    let publisher = this.OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: undefined,
      publishAudio: this.props.isAudioStatus,
      publishVideo: this.props.isVideoStatus,
      resolution: '640x480',
      frameRate: 30,
      insertMode: 'APPEND',
    })

    if (this.state.session.capabilities.publish) {
      publisher.on('accessAllowed' , () => {
        this.state.session.publish(publisher).then(() => {
            this.updateSubscribers();
            this.localUserAccessAllowed = true;
            if (this.props.joinSession) {
                this.props.joinSession();
            }
        });
      });
    }
    localUser.setNickname(this.state.myUserName)
    localUser.setConnectionId(this.state.session.connection.connectionId)
    localUser.setScreenShareActive(false)
    localUser.setStreamManager(publisher)
    this.subscribeToUserChanged()
    this.subscribeToStreamDestroyed()
    this.sendSignalUserChanged({
      isScreenShareActive: localUser.isScreenShareActive(),
    })

    this.setState({ localUser: localUser }, () => {
      this.state.localUser.getStreamManager().on('streamPlaying', (e) => {
        this.updateLayout()
        publisher.videos[0].video.parentElement.classList.remove('custom-class')
      })
    })

    //message
    const mySession = this.state.session
    this.props.setSession(mySession)
    mySession.on('signal:my-chat', (event) => {
      const message = event.data
      var messageDetail = this.state.messageDetail
      if (event.from.connectionId == event.from.session.connection.connectionId) {
        messageDetail.push({ message: message, from: 'user' })
        this.props.setMessages(
          { message: message, from: 'user' },
          this.props.appointmentId
        )
      } else {
        messageDetail.push({ message: message, from: 'sender' })
        this.props.setMessages(
          { message: message, from: 'sender' },
          this.props.appointmentId
        )
      }
      this.setState({ messageDetail: messageDetail })
      // this.props.setMessages(messageDetail)
    })
  }

  updateSubscribers() {
      var subscribers = this.remotes;
      this.setState(
          {
              subscribers: subscribers,
          },
          () => {

              if (this.state.localUser) {
                  this.sendSignalUserChanged({
                      isAudioActive: this.state.localUser.isAudioActive(),
                      isVideoActive: this.state.localUser.isVideoActive(),
                      nickname: this.state.localUser.getNickname(),
                      isScreenShareActive: this.state.localUser.isScreenShareActive(),
                  });
              }
              this.updateLayout();
          },
      );
  }

  leaveSession(status) {
    console.log("OpenViduCore:VideoRoomComponent leavesession");
    const mySession = this.state.session

    // const  history  = useHistory()
    // mySession.disconnect()
    if (this.state.session) {
      mySession.disconnect()
    }

    // Empty all properties...
    this.OV = null
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: 'SessionA',
      myUserName: 'OpenVidu_User' + Math.floor(Math.random() * 100),
      localUser: undefined,
      messageDetail: [],
    })
    if (this.props.leaveSession) {
      this.props.leaveSession()
    }

    // this.props.endCall()

    this.props.leaveCall(status)
    this.props.clearMessages()
  }
  camStatusChanged() {
    console.log("OpenViduCore:VideoRoomComponent camStatusChanged");
    localUser.setVideoActive(!localUser.isVideoActive())
    localUser.getStreamManager().publishVideo(localUser.isVideoActive())
    this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() })
    this.setState({ localUser: localUser })
  }

  micStatusChanged() {
    console.log("OpenViduCore:VideoRoomComponent micStatusChanged");
    localUser.setAudioActive(!localUser.isAudioActive())
    localUser.getStreamManager().publishAudio(localUser.isAudioActive())
    this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() })
    this.setState({ localUser: localUser })
  }

  nicknameChanged(nickname) {
    console.log("OpenViduCore:VideoRoomComponent nicknamechanged");
    let localUser = this.state.localUser
    localUser.setNickname(nickname)
    this.setState({ localUser: localUser })
    this.sendSignalUserChanged({
      nickname: this.state.localUser.getNickname(),
    })
  }

  deleteSubscriber(stream) {
    console.log("OpenViduCore:VideoRoomComponent deletesubscriber");
    const remoteUsers = this.state.subscribers
    const userStream = remoteUsers.filter(
      (user) => user.getStreamManager().stream === stream
    )[0]
    let index = remoteUsers.indexOf(userStream, 0)
    if (index > -1) {
      remoteUsers.splice(index, 1)
      this.setState({
        subscribers: remoteUsers,
      })
    }
  }

  subscribeToStreamCreated() {
    console.log("OpenViduCore:VideoRoomComponent subscribeToStreamCreated");
    this.state.session.on('streamCreated', (event) => {
      const subscriber = this.state.session.subscribe(event.stream, undefined)
      //var subscribers = this.state.subscribers
      subscriber.on('streamPlaying', (e) => {
        this.checkSomeoneShareScreen()
        subscriber.videos[0].video.parentElement.classList.remove('custom-class')
      })
      const newUser = new UserModel()
      newUser.setStreamManager(subscriber)
      newUser.setConnectionId(event.stream.connection.connectionId)
      newUser.setType('remote')
      const nickname = event.stream.connection.data.split('%')[0]
      newUser.setNickname(JSON.parse(nickname).clientData)
      this.remotes.push(newUser);
      if(this.localUserAccessAllowed) {
          this.updateSubscribers();
      }
    })
  }

  subscribeToStreamDestroyed() {
    console.log("OpenViduCore:VideoRoomComponent subscribeToStreamDestroyed");
    // On every Stream destroyed...
    this.state.session.on('streamDestroyed', (event) => {
      // Remove the stream from 'subscribers' array
      this.deleteSubscriber(event.stream)
      setTimeout(() => {
        this.checkSomeoneShareScreen()
      }, 20)
      event.preventDefault()
      this.updateLayout()
    })
  }

  subscribeToUserChanged() {
    console.log("OpenViduCore:VideoRoomComponent subscribeToUserChanged");
    this.state.session.on('signal:userChanged', (event) => {
      let remoteUsers = this.state.subscribers
      remoteUsers.forEach((user) => {
        if (user.getConnectionId() === event.from.connectionId) {
          const data = JSON.parse(event.data)
          if (data.isAudioActive !== undefined) {
            user.setAudioActive(data.isAudioActive)
          }
          if (data.isVideoActive !== undefined) {
            user.setVideoActive(data.isVideoActive)
          }
          if (data.nickname !== undefined) {
            user.setNickname(data.nickname)
          }
          if (data.isScreenShareActive !== undefined) {
            user.setScreenShareActive(data.isScreenShareActive)
          }
        }
      })
      this.setState(
        {
          subscribers: remoteUsers,
        },
        () => this.checkSomeoneShareScreen()
      )
    })
  }

  updateLayout() {
    //console.log("OpenViduCore:VideoRoomComponent updateLayout");
    setTimeout(() => {
      this.layout.updateLayout()
    }, 20)
  }

  sendSignalUserChanged(data) {
    console.log("OpenViduCore:VideoRoomComponent sendSignalUserChanged");
    const signalOptions = {
      data: JSON.stringify(data),
      type: 'userChanged',
    }
    this.state.session.signal(signalOptions)
  }

  toggleFullscreen() {
    console.log("OpenViduCore:VideoRoomComponent toggleFullscreen");
    const document = window.document
    const fs = document.getElementById('container')
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (fs.requestFullscreen) {
        fs.requestFullscreen()
      } else if (fs.msRequestFullscreen) {
        fs.msRequestFullscreen()
      } else if (fs.mozRequestFullScreen) {
        fs.mozRequestFullScreen()
      } else if (fs.webkitRequestFullscreen) {
        fs.webkitRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    }
  }

  screenShare() {
    console.log("OpenViduCore:VideoRoomComponent screenShare");
    const videoSource =
      navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen'
    const publisher = this.OV.initPublisher(
      undefined,
      {
        videoSource: videoSource,
        publishAudio: localUser.isAudioActive(),
        publishVideo: localUser.isVideoActive(),
        mirror: false,
      },
      (error) => {
        if (error && error.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
          this.setState({ showExtensionDialog: true })
        } else if (error && error.name === 'SCREEN_SHARING_NOT_SUPPORTED') {
          alert('Your browser does not support screen sharing')
        } else if (error && error.name === 'SCREEN_EXTENSION_DISABLED') {
          alert('You need to enable screen sharing extension')
        } else if (error && error.name === 'SCREEN_CAPTURE_DENIED') {
          alert('You need to choose a window or application to share')
        }
      }
    )

    publisher.once('accessAllowed', () => {
      this.state.session.unpublish(localUser.getStreamManager())
      localUser.setStreamManager(publisher)
      this.state.session.publish(localUser.getStreamManager()).then(() => {
        localUser.setScreenShareActive(true)
        this.setState({ localUser: localUser }, () => {
          this.sendSignalUserChanged({
            isScreenShareActive: localUser.isScreenShareActive(),
          })
        })
      })
    })
    publisher.on('streamPlaying', () => {
      this.updateLayout()
      publisher.videos[0].video.parentElement.classList.remove('custom-class')
    })
  }

  closeDialogExtension() {
    console.log("OpenViduCore:VideoRoomComponent closeDialogExtension");
    this.setState({ showExtensionDialog: false })
  }

  stopScreenShare() {
    console.log("OpenViduCore:VideoRoomComponent stopScreenShare");
    this.state.session.unpublish(localUser.getStreamManager())
    this.connectWebCam()
  }

  checkSomeoneShareScreen() {
    //console.log("OpenViduCore:VideoRoomComponent checkSomeoneShareScreen");
    let isScreenShared
    // return true if at least one passes the test
    isScreenShared =
      this.state.subscribers.some((user) => user.isScreenShareActive()) ||
      localUser.isScreenShareActive()
    const openviduLayoutOptions = {
      maxRatio: 3 / 2,
      minRatio: 9 / 16,
      fixedRatio: isScreenShared,
      bigClass: 'OV_big',
      bigPercentage: 0.8,
      bigFixedRatio: false,
      bigMaxRatio: 3 / 2,
      bigMinRatio: 9 / 16,
      bigFirst: true,
      animate: true,
    }
    this.layout.setLayoutOptions(openviduLayoutOptions)
    this.updateLayout()
  }

  toggleChat(property) {
    console.log("OpenViduCore:VideoRoomComponent toggleChat");
    let display = property

    if (display === undefined) {
      display = this.state.chatDisplay === 'none' ? 'block' : 'none'
    }
    if (display === 'block') {
      this.setState({ chatDisplay: display, messageReceived: false })
    } else {
      this.setState({ chatDisplay: display })
    }
    this.updateLayout()
  }

  checkNotification(event) {
    console.log("OpenViduCore:VideoRoomComponent checkNotification");
    this.setState({
      messageReceived: this.state.chatDisplay === 'none',
    })
  }
  checkSize() {
    console.log("OpenViduCore:VideoRoomComponent checkSize");
    if (
      document.getElementById('layout').offsetWidth <= 700 &&
      !this.hasBeenUpdated
    ) {
      this.toggleChat('none')
      this.hasBeenUpdated = true
    }
    if (document.getElementById('layout').offsetWidth > 700 && this.hasBeenUpdated) {
      this.hasBeenUpdated = false
    }
  }

  render() {
    //console.log("OpenViduCore:VideoRoomComponent render");
    const mySessionId = this.state.mySessionId
    const localUser = this.state.localUser
    var chatDisplay = { display: this.state.chatDisplay }

    return (
      <div
        id="layout"
        className={this.props.isFullScreen ? 'bounds-with-full-screen' : 'bounds'}
      >
        {localUser !== undefined && localUser.getStreamManager() !== undefined && (
          <div
            className={
              this.props.isFullScreen
                ? this.props.isInterChange
                  ? 'custom-class-with-full-screen-inter-change'
                  : 'subscriber-custom-class'
                : 'OT_root OT_publisher custom-class'
            }
            id="localUser"
          >
            <StreamComponent
              ToolBarComponent={this.props.ToolBarComponent}
              user={localUser}
              handleNickname={this.nicknameChanged}
              onPatientJoining={this.props.onPatientJoining}
              camStatusChanged={this.camStatusChanged}
              micStatusChanged={this.micStatusChanged}
              leaveSession={this.leaveSession}
              patientList={this.props.patientList}
              doctorName={this.props.doctorName}
              patientName={this.props.patientName}
              AddNextPatient={this.props.AddNextPatient}
              videoAvailability={this.props.videoAvailability}
              audioAvailability={this.props.audioAvailability}
              subscribers={this.state.subscribers}
              isPatientClick={this.props.isPatientClick}
              close={this.props.close}
              isAudioStatus={this.props.isAudioStatus}
              isVideoStatus={this.props.isVideoStatus}
              handleOnFullScreen={this.props.handleOnFullScreen}
              isFullScreen={this.props.isFullScreen}
              handleOnInterChange={this.props.handleOnInterChange}
              userRole={this.props.userRole}
              socket={this.props.socket}
            />
          </div>
        )}
        {this.state.subscribers.map((sub, i) => (
          <div
            key={i}
            className={
              this.props.isFullScreen
                ? this.props.isInterChange
                  ? 'subscriber-custom-class-inter-change'
                  : 'custom-class-with-full-screen'
                : 'OT_root OT_publisher custom-class'
            }
            id="remoteUsers"
          >
            <StreamComponent
              user={sub}
              streamId={sub.streamManager.stream.streamId}
              doctorClick={'joined'}
              patientName={this.props.patientName}
              doctorName={this.props.doctorName}
              userRole={this.props.userRole}
            />
          </div>
        ))}
        {localUser !== undefined && localUser.getStreamManager() !== undefined && (
          <div className="OT_root OT_publisher custom-class" style={chatDisplay}>
            <ChatComponent
              user={localUser}
              chatDisplay={this.state.chatDisplay}
              close={this.toggleChat}
              messageReceived={this.checkNotification}
            />
          </div>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSession: (data) => dispatch(setSession(data)),
    setMessages: (data, appointmentId) => dispatch(setMessages(data, appointmentId)),
    clearMessages: (data) => dispatch(clearMessages(data)),
  }
}

export default connect(null, mapDispatchToProps)(VideoRoomComponent)
