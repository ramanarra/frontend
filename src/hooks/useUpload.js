import { useState } from 'react'
import Api, { URL } from '../api'

const useUpload = ({
  onSuccess, onFail
}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const token = localStorage.getItem('virujhToken')
  const authStr = 'Bearer '.concat(token)

  const handleFetch = (formData) => {
    setLoading(true)
    Api.post(URL.patientFileUpload, formData,{
      headers: {
      Authorization: authStr,
    }
  }).then((res) => {
        setLoading(false)
        setError(null)
        setData(res.data)
        onSuccess && onSuccess()
      })
      .catch((err) => {
        setLoading(false)
        const response = { name: 'Error', status: err.response?.status }
        setData(response)
        setError(err)
        onFail && onFail()
      })
  }

  return [handleFetch,  data,loading]
}

export default useUpload
