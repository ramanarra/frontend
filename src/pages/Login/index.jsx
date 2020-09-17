import React from 'react'

import LoginUI from './LoginUI'
import Api, { URL } from '../../api'

function PatientLogin({ history }) {
  localStorage.clear()
  localStorage.setItem('loginUser', 'patient')
  function onLogin(userName, password, setError, setOpen, setOpenSnackBar) {
    const credentials = {
      phone: String(userName),
      password: password,
    }

    Api.post(
      URL.patientLogin,
      credentials
    )
      .then((res) => { 
        const { data } = res
        if (!data?.accessToken) {
          setError(true)
          setOpen(false)

          return
        }
        setOpen(false)
        localStorage.setItem('virujhToken', data.accessToken)
        localStorage.setItem('patientId', data.patientId)
        localStorage.setItem('patientName', `${data.firstName} ${data.lastName}`)
        localStorage.setItem('photo', data.photo)
        history.push('/patient/appointments/upcoming')
      })
      .catch(() => {
        setOpen(false)
        setOpenSnackBar(true)
      })
  }

  return (
    <LoginUI
      UserNameText="Phone Number"
      UserNameAutoComplete="number"
      useNamePlaceHolder="9999999999"
      UserNameErrorText="Please enter your Phone Number"
      onLogin={onLogin}
      errorMessage="Incorrect UserName or Password"
    />
  )
}

export default PatientLogin
