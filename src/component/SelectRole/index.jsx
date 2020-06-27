import React, { useState } from 'react'
import './selectRole.scss'
import { withRouter } from 'react-router-dom'

const SelectRole = (props) => {
  const [option, setOption] = useState('doctor')
  const ActiveTick = () => (
    <img src={require('../../assets/img/icons/active-tick.svg')} alt="tick" />
  )

  const handleSelect = (value) => {
    if (option === value) {
      props.history.push('/login')
    } else {
      setOption(value)
    }
  }

  return (
    <div className="select-role-page">
      <div className="select-role-view">
        <div className="select-role-logo">
          <img
            src={require('../../assets/img/logo-white.svg')}
            alt="VIRUJH"
            className="logo"
          />
        </div>
        <div className="select-role-control">
          <h1 className="select-role-head">Select your Role</h1>
          <div className="select-role-option">
            <div
              className={
                'doctor-option option-btn-container' +
                (option === 'doctor' ? ' selected-option' : '')
              }
              onClick={handleSelect.bind(this, 'doctor')}
            >
              {option === 'doctor' && (
                <div className="active-tick">
                  <ActiveTick />
                </div>
              )}
              <div className="doctor-logo option-btn">
                <i className="icon-doctor btn-img"></i>
              </div>
              <div className="option-title">Doctor</div>
            </div>

            <div
              className={
                'patient-option option-btn-container' +
                (option === 'patient' ? ' selected-option' : '')
              }
              onClick={handleSelect.bind(this, 'patient')}
            >
              {option === 'patient' && (
                <div className="active-tick">
                  <ActiveTick />
                </div>
              )}
              <div className="patient-logo option-btn">
                <i className="icon-patient btn-img"></i>
              </div>
              <div className="option-title">Patient</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(SelectRole)
