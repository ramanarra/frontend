import { useState } from 'react'

import API from '../api'

function useAppointmentUpdate(refetch) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  function handleOnFetch(url,{...params}) {
    setLoading(true)
    const token = localStorage.getItem('virujhToken')
    const authStr = 'Bearer '.concat(token)

    API.post(url, params, {
      headers: {
        Authorization: authStr,
      },
    })
      .then((res) => {
        setLoading(false)
        refetch()
        setData(res)

      })
      .catch((err) => {
        setLoading(false)
        const response = {name: 'Error',message: 'Something went to wrong'}
        setData(response)
      })
  }

  return [handleOnFetch, data, loading]
}

export default useAppointmentUpdate