import { useState, useEffect } from 'react'
import API from '../api'

function useCustomFecth(apiMethod, url, params, isNotRequriedReload) {
  const [data, setData] = useState(null)
  const [loading, setloading] = useState(true)
  const [reload, setRelaod] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('virujhToken')
    const authStr = 'Bearer '.concat(token)

    if (reload || isNotRequriedReload) {
      if (apiMethod === 'GET') {
        API.get(url, {
          params: { ...params },
          headers: {
            Authorization: authStr,
          },
        })
          .then((res) => {
            setloading(false)
            setData(res.data)
            setRelaod(false)
          })
          .catch((error) => {
            setloading(false)
            setError(error)
            setRelaod(false)
          })
      } else if (apiMethod === 'POST') {
        API.post(url, params, {
          headers: {
            Authorization: authStr,
          },
        })
          .then((res) => {
            setloading(false)
            setData(res.data)
            setRelaod(false)
          })
          .catch((error) => {
            setloading(false)
            setError(error)
            setRelaod(false)
          })
      }
    }
  }, [apiMethod, url, params, reload, isNotRequriedReload])

  const reFetch = () => {
    setRelaod(true)
  }

  return [data, reFetch, loading, error]
}

export default useCustomFecth
