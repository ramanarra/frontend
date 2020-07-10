import { useState } from 'react'

import API from '../../api'

function useUpdateWorkSchedule() {
  const [loading, setLoading] = useState(false)

  function handleOnFetch(params) {
    setLoading(true)
    const token = localStorage.getItem('virujhToken')
    const authStr = 'Bearer '.concat(token)

    API.post('calendar/workScheduleEdit', params, {
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

export default useUpdateWorkSchedule