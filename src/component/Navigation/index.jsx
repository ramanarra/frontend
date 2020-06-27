import React from 'react'
import './navigation.scss'

const Navigation = () => {
  return (
    <nav className="app-navbar">
      <div className="logo-img">
        <img
          src={require('../../assets/img/logo.png')}
          className="app-logo"
          alt="logo"
        />
      </div>
      <div className="left-wrapper">
        <div className="vd-wrap">
          <i className="icon-video "></i>
          VIDEO CONSULTATION
        </div>
        <div className="notify-wrap">
          <i className="icon-notify"></i>
        </div>
        <div className="logedin-info">
          <div className="signin-title">Amrit Medicare Pvt. Ltd.</div>
          <div className="signin-img">
            <img
              src={require('../../assets/img/med.png')}
              className="img-sigin"
              alt="hospital logo"
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
