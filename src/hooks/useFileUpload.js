import { useState } from 'react'
import Api, { URL } from '../api'

const useFileUpload = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const token = localStorage.getItem('virujhToken')
  const authStr = 'Bearer '.concat(token)

  const handleFetch = (formdata) => {
    setLoading(true)
    Api.post(URL.fileUpload, formdata,{
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

  return [handleFetch,  data,loading]
}

export default useFileUpload