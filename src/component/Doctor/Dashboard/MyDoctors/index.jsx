import React from 'react'
import { withRouter } from 'react-router-dom'
import { FaRupeeSign } from 'react-icons/fa'
import { Button } from 'antd'
import { SettingOutlined } from '@ant-design/icons'

import { paths } from '../../../../config'
import './myDoctor.scss'

const MyDoctor = ({ docList, history }) => {
  if (!docList) {
    return null
  }

  const { doctorList } = docList

  return (
    <div className="tab-pane active my-doctors-sec" id="tab_default_1">
      <div className="user-cards-wrap">
        {doctorList.map((value) => (
          <div key={value.id} className="user-card">
            <SettingOutlined className="setting-Outlined" />

            <div className="user-row">
              <img src={value.photo} className="usr-img" alt="userImage" />
              <div className="user-detail">
                <h1 className="user-name">{value.doctorName}</h1>
                <p className="name-desg">{value.speciality}</p>
              </div>
            </div>
            <div className="user-meet-detail">
              <div className="user-fees">
                <p className="title-light">Fees</p>
                <p className="card-text display">
                  <FaRupeeSign className="fa-rupees-sign" />
                  {value.fees}
                </p>
              </div>
              <div className="user-appt">
                <p className="title-light">Today's Appointment</p>
                <div className="card-tag">
                  {value.todaysAppointment.map((a, index) => (
                    <span key={index} className="time-tag">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
              <div className="user-slot">
                <p className="title-light">Today Available slots</p>
                <p className="card-text">{value.todaysAvailabilitySeats}</p>
              </div>
            </div>
            <div className="user-btn-row">
              <div className="select-check">
                <input
                  className="styled-checkbox"
                  id={'select-card' + value.id}
                  type="checkbox"
                  value="false"
                />
                <label htmlFor={'select-card' + value.id}></label>
              </div>
              <Button
                className="settings-btn"
                onClick={() =>
                  history.push({
                    pathname: paths.hospital.doctor.default,
                    state: { key: value.doctorKey },
                  })
                }
              >
                Settings
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default withRouter(MyDoctor)
