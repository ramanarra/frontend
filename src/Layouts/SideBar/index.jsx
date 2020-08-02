import React from 'react'
import DoctorSideaBar from './DoctorSideBar'
import PatientSideBar from './PatientSideBar'

function NavBar() {
  if (localStorage.getItem('loginUser') === 'doctor') {
    return <DoctorSideaBar />
  }
  else {
    return <PatientSideBar />
  }
}

export default NavBar
