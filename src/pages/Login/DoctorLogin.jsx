import React from 'react'

import LoginUI from './LoginUI'
import Api, { URL } from '../../api'

function DoctorLogin({ history }) {
  localStorage.clear()
  localStorage.setItem('loginUser', 'doctor')
  function onLogin(userName, password, setError, setOpen, setOpenSnackBar) {
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
          setOpen(false)

          return
        }
        setOpen(false)
        localStorage.setItem('virujhToken', data.accessToken)
        localStorage.setItem('role', data.role)
        localStorage.setItem('docKey', data.doctorKey)
        localStorage.setItem('accountKey', data.accountKey)
        const rolesPermission = JSON.stringify(data.rolesPermission)
        localStorage.setItem('rolesPermission', rolesPermission)
        localStorage.setItem('hospitalName',data.accountName)
        localStorage.setItem('hospitalPhoto',data.hospitalPhoto)
        localStorage.setItem('photo', data.photo )
        history.push('/doctors')
      })
      .catch(() => {
        setOpen(false)
        setOpenSnackBar(true)
      })
  }

  return (
    <LoginUI
      UserNameText="Email ID"
      UserNameAutoComplete="email"
      useNamePlaceHolder="johndoe@gmail.com"
      UserNameErrorText="Please enter your Email"
      onLogin={onLogin}
      errorMessage="Incorrect UserName or Password"
    />
  )
}

export default DoctorLogin
