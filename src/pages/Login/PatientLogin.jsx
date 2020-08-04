import React from 'react'

import LoginUI from './LoginUI'
import Api, { URL } from '../../api'

function PatientLogin({ history }) {
  function onLogin(userName, password, setError) {
    const credentials = {
      phone: userName,
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

          return
        }
        localStorage.setItem('virujhToken', data.accessToken)
        localStorage.setItem('patientId', data.patientId)
        history.push('/patient/appointments/upcoming')
      })
      .catch(() => {
        setError(true)
      })
  }

  return (
    <LoginUI
      UserNameText="Phone Number"
      UserNameAutoComplete="email"
      useNamePlaceHolder="9999999999"
      UserNameErrorText="Please enter your Phone Number"
      onLogin={onLogin}
      errorMessage="Incorrect UserName and Password"
    />
  )
}

export default PatientLogin
