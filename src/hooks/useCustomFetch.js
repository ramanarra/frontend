import { useState, useEffect, useRef } from 'react'
import API from '../api'

function useCustomFecth(apiMethod, url, params) {
  const [data, setData] = useState(null)
  const [loading, setloading] = useState(true)
  const [reload, setRelaod] = useState(true)
  const [error, setError] = useState(null)

  const previousUrl = useRef(url)
  const previousParams = useRef(params)

  useEffect(() => {
    if (
      previousUrl.current !== url ||
      JSON.stringify(previousParams) !== JSON.stringify(params)
    ) {
      setRelaod(true)
    }
  }, [url, params, previousUrl, previousParams])

  useEffect(() => {
    const token = localStorage.getItem('virujhToken')
    const authStr = 'Bearer '.concat(token)

    if (reload) {
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
  }, [apiMethod, url, params, reload])

  useEffect(() => {
    previousUrl.current = url
    previousParams.current = params
  }, [url, params, previousUrl, previousParams])

  const reFetch = () => {
    setRelaod(true)
  }

  return [data, reFetch, loading, error]
}

export default useCustomFecth
