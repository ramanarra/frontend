import { useState } from 'react'

import API, { URL } from '../api'

function usePatientDetailsUpdate(refetch) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  function handleOnFetch(params) {
    setLoading(true)
    const token = localStorage.getItem('virujhToken')
    const authStr = 'Bearer '.concat(token)

    API.post(URL.patientDetailsEdit, params, {
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
        const response = {name: 'Error',message: 'Something went to wrong'}
        setData(response)
      })
  }

  return [handleOnFetch, data, loading]
}

export default usePatientDetailsUpdate