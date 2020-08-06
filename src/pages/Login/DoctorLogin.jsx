import React from 'react'

import LoginUI from './LoginUI'
import Api, { URL } from '../../api'

function DoctorLogin({ history }) {
  function onLogin(userName, password, setError) {
    const credentials = {
      email: userName,
      password: password,
    }

    Api.post(
      URL.doctorLogin,
      credentials
    )
      .then((res) => {
        const { data } = res
        if (!data?.accessToken) {
          setError(true)

          return
        }
        localStorage.setItem('virujhToken', data.accessToken)
        localStorage.setItem('role', data.role)
        localStorage.setItem('docKey', data.doctorKey)
        localStorage.setItem('accountKey', data.accountKey)
        const rolesPermission = JSON.stringify(data.rolesPermission)
        localStorage.setItem('rolesPermission', rolesPermission)
        history.push('/doctors')
      })
      .catch(() => {
        setError(true)
      })
  }

  return (
    <LoginUI
      UserNameText="Email"
      UserNameAutoComplete="email"
      useNamePlaceHolder="johndoe@gmail.com"
      UserNameErrorText="Please enter your Email"
      onLogin={onLogin}
      errorMessage="Incorrect UserName or Password"
    />
  )
}

export default DoctorLogin
