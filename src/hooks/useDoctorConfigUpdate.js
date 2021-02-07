import { useState } from 'react'

import API, { URL } from '../api'

function useDoctorConfigUpdate(refetch) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  function handleOnFetch(params) {
    setLoading(true)
    const token = localStorage.getItem('virujhToken')
    const authStr = 'Bearer '.concat(token)

    API.post(URL.doctorConfigUpdate, params, {
      headers: {
        Authorization: authStr,
      },
    })
      .then((res) => {
        setLoading(false)
        setData(res.data)
        refetch()
      })
      .catch((res) => {
        setLoading(false)
        const response = {name: 'Error', status: res.response.status }
        setData(response)
        refetch()
      })
  }

  return [handleOnFetch, data, loading]
}

export default useDoctorConfigUpdate