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
      console.log('PROPS: ', this.props)
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
    const { showWaiting } = this.props
    return (
      <div className="ov-video">
        {this.props.isPatientClick && this.props.subscribers.length === 0 ? (
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
                <CircularProgress className="spinner" style={{color: '#ffffff'}} />
                <p className="text" style={{color: '#ffffff'}}>...waiting for patient to join</p>
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

// const mapStateToProps = ({ doctor }, ownProps) => {
//   return {
//     showWaiting:
//       doctor.isPatientClicked &&
//       ownProps.subscribers &&
//       ownProps.subscribers.length === 0,
//   }
// }

// export default connect(mapStateToProps, null)(OvVideoComponent)
