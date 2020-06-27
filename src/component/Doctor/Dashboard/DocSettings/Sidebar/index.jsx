import React, { useState } from 'react'
import { paths } from '../../../../../config'
import { Layout } from 'antd'
import { Link } from 'react-router-dom'
import './sidebar.scss'

const { Sider } = Layout

const Sidebar = () => {
  const [screen, setScreen] = useState('profile')

  const handleSwitch = (id) => {
    setScreen(id)
  }

  return (
    <Sider className="doc-settings-sidebar">
      <ul className="menu-list">
        <li className={'menu-item' + (screen === 'profile' ? ' active' : '')}>
          <Link
            onClick={handleSwitch.bind(this, 'profile')}
            to={paths.hospital.doctor.profile}
          >
            Doctor Personal Setting
          </Link>
        </li>
        <li className={'menu-item' + (screen === 'reschedule' ? ' active' : '')}>
          <Link
            onClick={handleSwitch.bind(this, 'reschedule')}
            to={paths.hospital.doctor.reschedule}
          >
            Cancellation/Reschedule Option
          </Link>
        </li>
        <li className={'menu-item' + (screen === 'questions' ? ' active' : '')}>
          <Link
            onClick={handleSwitch.bind(this, 'questions')}
            to={paths.hospital.doctor.questions}
          >
            Questionnaire For Patients
          </Link>
        </li>
        <li className={'menu-item' + (screen === 'schedule' ? ' active' : '')}>
          <Link
            onClick={handleSwitch.bind(this, 'schedule')}
            to={paths.hospital.doctor.schedule}
          >
            Work Schedules
          </Link>
        </li>
      </ul>
    </Sider>
  )
}

export default Sidebar
