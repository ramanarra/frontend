import React from 'react'
import { Redirect } from 'react-router-dom'

import DoctorLogin from './DoctorLogin'
import PatientLogin from './PatientLogin'

function Login({ history }) {
  // if (localStorage.getItem('loginUser') === 'doctor') {
  //   return <DoctorLogin history={history} />
  // }

  // if (localStorage.getItem('loginUser') === 'patient') {
  //   return <PatientLogin history={history} />
  // }

  return <PatientLogin history={history} />
}

export default Login