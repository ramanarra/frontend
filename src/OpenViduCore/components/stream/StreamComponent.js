import React, { Component } from 'react'
import './StreamComponent.css'
import OvVideoComponent from './OvVideo'

import MicOff from '@material-ui/icons/MicOff'
import VideocamOff from '@material-ui/icons/VideocamOff'
import VolumeUp from '@material-ui/icons/VolumeUp'
import VolumeOff from '@material-ui/icons/VolumeOff'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import IconButton from '@material-ui/core/IconButton'
import HighlightOff from '@material-ui/icons/HighlightOff'
import FormHelperText from '@material-ui/core/FormHelperText'
import NoCam from './NoCam'

export default class StreamComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nickname: this.props.user.getNickname(),
      showForm: false,
      mutedSound: false,
      isFormValid: true,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handlePressKey = this.handlePressKey.bind(this)
    this.toggleNicknameForm = this.toggleNicknameForm.bind(this)
    this.toggleSound = this.toggleSound.bind(this)
  }

  handleChange(event) {
    this.setState({ nickname: event.target.value })
    event.preventDefault()
  }

  toggleNicknameForm() {
    if (this.props.user.isLocal()) {
      this.setState({ showForm: !this.state.showForm })
    }
  }

  toggleSound() {
    this.setState({ mutedSound: !this.state.mutedSound })
  }

  handlePressKey(event) {
    if (event.key === 'Enter') {
      if (this.state.nickname.length >= 3 && this.state.nickname.length <= 20) {
        this.props.handleNickname(this.state.nickname)
        this.toggleNicknameForm()
        this.setState({ isFormValid: true })
      } else {
        this.setState({ isFormValid: false })
      }
    }
  }

  render() {
    const ToolBarComponent = this.props.ToolBarComponent
    return (
      <div className="OT_widget-container">
        <div className="pointer nickname">
          <div style={{ display: 'flex' }}>
            <div>Dr.{this.props.doctorName}</div>
            {this.props.subscribers &&
              this.props.subscribers.length > 0 &&
              this.props.patientName && (
                <div>{`${', '}${this.props.patientName}`}</div>
              )}
          </div>
          {this.props.subscribers &&
            this.props.subscribers.length > 0 &&
            this.props.patientName && <div> 2 paticipants </div>}
        </div>

        {this.props.user !== undefined &&
        this.props.user.getStreamManager() !== undefined ? (
          <div className="streamComponent">
            <OvVideoComponent
              user={this.props.user}
              mutedSound={this.state.mutedSound}
              subscribers={this.props.subscribers}
              isPatientClick={this.props.isPatientClick}
              patientName={this.props.patientName}
              isFullScreen={this.props.isFullScreen}
              doctorClick={this.props.doctorClick}
            />
            {!this.props.user.isVideoActive() &&
              !!this.props.user.getStreamManager().stream.streamId && (
                <NoCam
                  name={
                    this.props.user.type === 'local'
                      ? this.props.userRole === 'DOCTOR'
                        ? this.props.doctorName
                        : this.props.patientName
                      : this.props.userRole === 'DOCTOR'
                      ? this.props.patientName
                      : this.props.doctorName
                  }
                />
              )}
            {this.props.user.isLocal() ? (
              <ToolBarComponent
                isVideoActive={this.props.user.isVideoActive()}
                isAudioActive={this.props.user.isAudioActive()}
                onVideoStateChange={this.props.camStatusChanged}
                onMuteStateChange={this.props.micStatusChanged}
                onLeaveSession={this.props.leaveSession}
                onJoiningPatient={this.props.onPatientJoining}
                patientList={this.props.patientList}
                AddNextPatient={this.props.AddNextPatient}
                videoAvailability={this.props.videoAvailability}
                audioAvailability={this.props.audioAvailability}
                close={this.props.close}
                isAudioStatus={this.props.isAudioStatus}
                subscribers={this.props.subscribers}
                isFullScreen={this.props.isFullScreen}
                handleOnFullScreen={this.props.handleOnFullScreen}
                handleOnInterChange={this.props.handleOnInterChange}
                socket={this.props.socket}
              />
            ) : null}
            <VideocamOff id="statusCam" />
            <div id="statusIcons">
              {!this.props.user.isVideoActive() ? (
                <div id="camIcon">
                  <VideocamOff id="statusCam" />
                </div>
              ) : null}

              {!this.props.user.isAudioActive() ? (
                <div id="micIcon">
                  <MicOff id="statusMic" />
                </div>
              ) : null}
            </div>
            <div>
              {/* {!this.props.user.isLocal() && (
                <IconButton id="volumeButton" onClick={this.toggleSound}>
                  {this.state.mutedSound ? (
                    <VolumeOff color="secondary" />
                  ) : (
                    <VolumeUp />
                  )}
                </IconButton>
              )} */}
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}
