import React from 'react'
import Api, { URL } from '../../../api'
import LoginUI from './LoginUI'

function CorporateLogin({ }) {
  localStorage.clear()
  function onLogin(companyCode,mobileNumber, password, setError, setOpen, setOpenSnackBar) {
    const credentials = {
      companyCode:String(companyCode),
      phone: Number(mobileNumber),
      password: password,
    }

    Api.post(
      URL.corporateLogin,
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
        // localStorage.setItem('virujhToken', data.accessToken)
        // localStorage.setItem('patientId', data.patientId)
        // localStorage.setItem('patientName', `${data.firstName} ${data.lastName}`)
        // localStorage.setItem('photo', data.photo)
      })
      .catch(() => {
        setOpen(false)
        setOpenSnackBar(true)
      })
  }

  return (
    <LoginUI
      UserNameText="Company_Code"
      UserNameAutoComplete="Company_Code"
    
      UserNameErrorText="Please enter your Company_Code"
      onLogin={onLogin}
      errorMessage="Incorrect UserName or Password"
    />
  )
}

export default CorporateLogin
