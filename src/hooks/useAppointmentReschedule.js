import { useState } from 'react'

import API from '../api'

function useAppointmentReschedule(refetch) {
  const [loading, setLoading] = useState(false)

  function handleOnFetch(url,{...params}) {
    setLoading(true)
    const token = localStorage.getItem('virujhToken')
    const authStr = 'Bearer '.concat(token)

    API.post(url, params, {
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

export default useAppointmentReschedule