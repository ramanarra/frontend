import React from 'react'
import DoctorHeader from './DoctorHeader'
import PatientHeader from './PatientHeader'

export default function ButtonAppBar() {

    if (localStorage.getItem('loginUser') === 'doctor') {
          return <DoctorHeader />
      }
    else {
          return <PatientHeader />
      }
}
