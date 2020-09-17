import React, { Component } from 'react'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import './OvVideo.css'

export default class OvVideoComponent extends Component {
  constructor(props) {
    super(props)
    this.videoRef = React.createRef()
  }

  componentDidMount() {
    if (this.props && this.props.user.streamManager && !!this.videoRef) {
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current)
    }

    if (
      this.props &&
      this.props.user.streamManager.session &&
      this.props.user &&
      !!this.videoRef
    ) {
      this.props.user.streamManager.session.on('signal:userChanged', (event) => {
        const data = JSON.parse(event.data)
        if (data.isScreenShareActive !== undefined) {
          this.props.user.getStreamManager().addVideoElement(this.videoRef.current)
        }
      })
    } 
  }

  componentDidUpdate(props) {
    if (props && !!this.videoRef) {
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current)
    }
  }

  render() {
    return (
      <div className="ov-video">
        {this.props.subscribers &&
        this.props.subscribers.length === 0 ? (
          <div className="ov-video-container">
            <div className="video">
              <video
                autoPlay={true}
                id={'video-' + this.props.user.getStreamManager().stream.streamId}
                ref={this.videoRef}
                muted={this.props.mutedSound}
              />
            </div>
            <div className="waiting-container">
              {this.props.isPatientClick ? (
                <div>
                  <CircularProgress
                    className="spinner"
                    style={{ color: '#ffffff' }}
                  />
                  <p className="text" style={{ color: '#ffffff' }}>
                    waiting for {this.props.patientName} to join...
                  </p>
                </div>
              ) : (
                <p className="text" style={{ color: '#ffffff', marginTop: '50%' }}>
                  Check for patients in waiting list
                </p>
              )}
            </div>
          </div>
        ) : (
          <video
            autoPlay={true}
            id={'video-' + this.props.user.getStreamManager().stream.streamId}
            ref={this.videoRef}
            muted={this.props.mutedSound}
          />
        )}
      </div>
    )
  }
}
