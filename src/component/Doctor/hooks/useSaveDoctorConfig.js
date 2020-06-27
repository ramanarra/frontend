import { useState } from 'react'

import API from '../../../api'

function useSaveDoctorConfig() {
  const [loading, setLoading] = useState(false)

  function handleOnFetch(params) {
    setLoading(true)
    const token = localStorage.getItem('accessToken')
    const authStr = 'Bearer '.concat(token)

    API.post('/calendar/doctorConfigUpdate', params, {
      headers: {
        Authorization: authStr,
      },
    })
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return [handleOnFetch, loading]
}

export default useSaveDoctorConfig
