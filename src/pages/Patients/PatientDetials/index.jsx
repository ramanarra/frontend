import React, { useState } from 'react'
import { Tab, Tabs } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import Details from './Details'
import Appointment from './Appointment'
import Report from './Report'
import './style.scss'

const PatientDetails = () => {
  const [tab, switchTab] = useState(0)
  const { patientId } = useParams()
  const doctorKey = localStorage.getItem('docKey')
  const params = { patientId: parseInt(patientId), doctorKey }
  const token = localStorage.getItem('virujhToken')
  const headers = {
    Authorization: 'Bearer '.concat(token),
  }

  const allyProps = { params, headers, patientId, doctorKey }

  return (
    <div className="pat-det-view-screen">
      <div className="tab-wrap">
        <Tabs
          className="report-tab-switcher"
          value={tab}
          onChange={(e, value) => switchTab(value)}
        >
          <Tab label="Patient Details" className="report-tab" />
          <Tab label="Appointments" className="report-tab" />
          <Tab label="Lab Report" className="report-tab" />
        </Tabs>
      </div>
      <div className="panel-wrap">
        {tab === 0 && <Details {...allyProps} />}
        {tab === 1 && <Appointment {...allyProps} />}
        {tab === 2 && <Report {...allyProps} />}
      </div>
    </div>
  )
}

export default PatientDetails
