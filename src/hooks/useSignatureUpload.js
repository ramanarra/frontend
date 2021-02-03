import { useState } from 'react'
import Api, { URL } from '../api'

const useSignatureUpload = ( ) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const token = localStorage.getItem('virujhToken')
  const authStr = 'Bearer '.concat(token)

  const handleFetch = (formdata) => {
    setLoading(true)
    Api.post(URL.doctorSignatureUpload,formdata,{
      headers: {
      Authorization: authStr,
    }
   
  }).then((res) => {
        setLoading(false)
        setError(null)
        setData(res.data)
      })
      .catch((err) => {
        setLoading(false)
        const response = { name: 'Error', status: err.response?.status }
        setData(response)
        setError(err)
      })
  }

  return [handleFetch,data,loading]
}

export default useSignatureUpload