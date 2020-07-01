import React, { useState, useMemo } from 'react'

import Tab from './Tab'
import MyDoctor from './MyDoctors'
import Schedule from './Schedule'
import useCustomFetch from '../../../hooks/useCustomFetch'
import ROLE from '../../../constants'
import './dashboard.scss'

function Dashboard() {
  const [tab, setTab] = useState(0)

  const key = useMemo(() => {
    return localStorage.getItem('role') === ROLE.doctor
      ? localStorage.getItem('docKey')
      : localStorage.getItem('accountKey')
  })

  const [docList] = useCustomFetch(
    'GET',
    `calendar/doctorList?key=${key}`
  )

  return (
    <section className="content-wrapper doc-dashboard">
      <div className="dashboard-wrapper">
        <div className="tabbable-panel">
          <div className="tabbable-line">
            <Tab tab={tab} switchTab={(value) => setTab(value)} />
            <div className="tab-content">
              {tab === 0 && <MyDoctor docList={docList} />}
              {tab === 1 && <Schedule docList={docList}/>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
