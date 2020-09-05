import { useState } from 'react'
import api from '../api'

const useManualFetch = () => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const token = localStorage.getItem('virujhToken')
  const headers = {
    Authorization: 'Bearer '.concat(token),
  }

  const handleFetch = (method, url, data) => {
    setLoading(true)
    api({
      method,
      url,
      data,
      headers,
    })
      .then((res) => {
        setLoading(false)
        setError(null)
        setData(res.data)
      })
      .catch((err) => {
        setLoading(false)
        const response = {name: 'Error', status: err.response.status}
        setData(response)
        setError(err)
      })
  }

  return [handleFetch, error, isLoading, data]
}

export default useManualFetch
