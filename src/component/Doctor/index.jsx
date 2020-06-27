import React from 'react'
import Sidebar from './Sidebar'
import DocRoute from './DocRoute'

const Doctor = () => {
  return (
    <div className="app-content doctor-section">
      <Sidebar />
      <DocRoute />
    </div>
  )
}

export default Doctor
