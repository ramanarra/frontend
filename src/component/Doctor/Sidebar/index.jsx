import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import './sidebar.scss'
import { paths } from '../../../config'

const Sidebar = (props) => {
  const [screen, setScreen] = useState('dashboard')

  const changePath = (path) => {
    props.history.push(path)
  }

  const handleSwitch = (id) => {
    setScreen(id)
    changePath(paths.hospital[id])
  }

  return (
    <div className="app-sidebar">
      <ul id="main-menu-navigation" className="navigation navigation-main">
        <li
          className={'nav-item' + (screen === 'dashboard' ? ' active' : '')}
          onClick={handleSwitch.bind(this, 'dashboard')}
        >
          <a>
            <i className="icon-doctor menu-ic"></i>
            <span className="menu-title">Dashboard</span>
          </a>
        </li>

        <li
          className={'nav-item' + (screen === 'patients' ? ' active' : '')}
          onClick={handleSwitch.bind(this, 'patients')}
        >
          <a>
            <i className="icon-patient menu-ic"></i>
            <span className="menu-title">Inbox</span>
          </a>
        </li>

        <li
          className={'nav-item' + (screen === 'reports' ? ' active' : '')}
          onClick={handleSwitch.bind(this, 'reports')}
        >
          <a>
            <i className="icon-progress menu-ic"></i>
            <span className="menu-title">Task Board</span>
          </a>
        </li>

        <li
          className={'nav-item' + (screen === 'settings' ? ' active' : '')}
          onClick={handleSwitch.bind(this, 'settings')}
        >
          <a>
            <i className="icon-settings menu-ic"></i>
            <span className="menu-title">Calendar</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Sidebar)
