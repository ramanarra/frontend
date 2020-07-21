import { useState, useEffect } from 'react'

const useStateCallback = (initialValue) => {
  const [data, setData] = useState({
    value: initialValue || null,
    callBack: null,
  })

  useEffect(() => {
    data.callBack && data.callBack()
  }, [data])

  const updateValue = (value, callBack) => {
    setData({ value, callBack })
  }

  return [data.value, updateValue]
}

export default useStateCallback
