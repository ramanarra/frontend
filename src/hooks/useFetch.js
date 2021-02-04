import axios from '../api'
import { useMemo, useState, useEffect } from 'react'
import { capitalize } from '../components/commonFormat'

const useFetch = (props, updateProps = []) => {
  // prettier-ignore
  const { name, value, method, url, params, headers: headerProp, initLoad = true, monitorProps, onSuccess, onFail, noLoading, dontLoad } =
    props || {}

  const [headers, setHeader] = useState(
    headerProp || {
      Authorization: `Bearer ${localStorage.getItem('virujhToken')}`
    }
  )

  // response successful response data & failed response error set from fetching the end point
  const [data, setData] = useState(value || null)
  const [error, setError] = useState(null)

  const [isLoading, setLoading] = useState(false)

  // initial value data
  const [hadResult, setHadResult] = useState(false)
  const [initResult, setInitResult] = useState(value || null)

  // custom props to be monitored
  const refinedUpdateProps = useMemo(() => {
    console.log('called memo')
    return updateProps
  }, [...updateProps])

  // config will gets url, params, method, dontload, noLoading, onSuccess, onFail, noGlobalCallback
  const handleFetch = (config) => {
    const shouldLoad = !config?.noLoading || !noLoading
    shouldLoad && setLoading(true)
    setError(null)

    const type = !!config?.method ? config?.method?.toLowerCase() : 'get'
    const fetchUrl = config?.url ?? url
    const fetchParams = config?.params ?? params

    //check if should load
    if (!!fetchUrl && !dontLoad && !config?.dontLoad) {
      if (type === 'get' || type === 'delete') {
        // fetch for query params
        axios[type](fetchUrl, {
          [type === 'get' ? 'params' : 'data']: fetchParams,
          headers
        })
          .then((res) => {
            setLoading(false)
            setError(null)
            setData(res.data)

            //set init value when API loads for first time
            if (!hadResult) {
              setInitResult(res.data)
              setHadResult(true)
            }

            //callbacks on success
            if (!config?.noGlobalCallback) {
              !!onSuccess && onSuccess()
            }
            !!config?.onSuccess && config.onSuccess()

            //send notification if the API has notification in response
            //Note: to achieve notification it should have title with optional message from response
            const notification = res.data?.notification
            !!notification?.title && console.log(notification?.title)
          })
          .catch((err) => {
            setLoading(false)
            setData(null)
            setError(err)

            //callback on fail
            if (!config?.noGlobalCallback) {
              !!onFail && onFail()
            }
            !!config.onFail && config.onFail()

            //notification on failure
            const notification =
              err.data?.notification || err.response?.data?.notification
            !!notification?.title && console.log(notification?.title)
          })
      } else {
        // fetch for body params
        axios({
          method: type,
          url: fetchUrl,
          data: fetchParams,
          headers
        })
          .then((res) => {
            setLoading(false)
            setError(null)
            setData(res.data)

            //set init value when API loads for first time
            if (!hadResult) {
              setInitResult(res.data)
              setHadResult(true)
            }

            //callbacks on success
            if (!config?.noGlobalCallback) {
              !!onSuccess && onSuccess()
            }
            !!config?.onSuccess && config.onSuccess()

            //send notification if the API has notification in response
            //Note: to achieve notification it should have title with optional message from response
            const notification = res.data?.notification
            !!notification?.title && console.log(notification?.title)
          })
          .catch((err) => {
            setLoading(false)
            setData(null)
            setError(err)

            //callback on fail
            if (!config?.noGlobalCallback) {
              !!onFail && onFail()
            }
            !!config.onFail && config.onFail()

            //notification on failure
            const notification =
              err.data?.notification || err.response?.data?.notification
            !!notification?.title && console.log(notification?.title)
          })
      }
    }
  }

  //conditional loading
  const reload = (shouldReload, config) => {
    if (!!shouldReload) {
      handleFetch(config)
    }
  }

  //to load initially if enabled
  //Note: if monitorProps is enabled no need to enable initLoad
  useEffect(() => {
    if (initLoad) {
      handleFetch()
    }
  }, [initLoad])

  //to monitor props if enabled
  //Note: if it gets custom props monitor props will enable automatically
  useEffect(() => {
    if (monitorProps) {
      handleFetch()
    }
  }, [params, url, method, monitorProps])

  //to fetch when any of the dependecnies gets updated
  useEffect(() => {
    if(!!refinedUpdateProps.length) {
      handleFetch()
    }
  }, [...refinedUpdateProps])

  //keeping header up to date when passed
  useEffect(() => {
    if (!!headerProp) setHeader(headerProp)
  }, [headerProp])

  // pass name to generate custom variables with that name
  return {
    [!!name ? `fetch${capitalize(name)}` : 'handleFetch']: handleFetch,
    [name || 'data']: data,
    [!!name ? `is${capitalize(name)}Loading` : 'isLoading']: isLoading,
    [!!name ? `${name}Error` : 'error']: error,
    [!!name ? `set${capitalize(name)}` : 'setData']: setData,
    [!!name ? `${name}HadResult` : 'hadResult']: hadResult,
    [!!name ? `${name}InitResult` : 'initResult']: initResult,
    [!!name ? `load${capitalize(name)}` : 'loadData']: reload
  }
}

export default useFetch
