import { useState } from 'react'

import API, { URL } from '../api'

function useDoctorConfigUpdate(refetch) {
  const [loading, setLoading] = useState(false)

  function handleOnFetch(params) {
    setLoading(true)
    const token = localStorage.getItem('virujhToken')
    const authStr = 'Bearer '.concat(token)

    API.post(URL.doctorConfigUpdate, params, {
      headers: {
        Authorization: authStr,
      },
    })
      .then(() => {
        setLoading(false)
        refetch()
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return [handleOnFetch, loading]
}

export default useDoctorConfigUpdate