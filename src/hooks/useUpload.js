import { useState } from 'react'
import Api, { URL } from '../api'

const useUpload = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const token = localStorage.getItem('virujhToken')
  const headers = {
    Authorization: 'Bearer '.concat(token),
  }

  const handleFetch = (formdata) => {
    setLoading(true)
    Api.post(URL.patientFileUpload, formdata,headers)
      .then((res) => {
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

  return [handleFetch,  data,loading]
}

export default useUpload
