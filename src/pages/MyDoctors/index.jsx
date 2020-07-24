import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { METHOD, URL } from '../../api'
import useCustomFetch from '../../hooks/useCustomFetch'
import Navigation from './Navigation'
import Doctors from './Doctors'
import Appointments from './Appointments'

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    padding: '22px 25px 30px 16px',
    height: '100%',
    background: '#f9f9f9',
    overflowY: 'auto',
  },
}))

function MyDoctors() {
  const classes = useStyles()

  const location = useLocation()

  const path = location.pathname.split('/')

  const pathName = path.length === 2 ? path[1] : ''

  const key = useMemo(() => {
    return localStorage.getItem('role') === 'DOCTOR'
      ? localStorage.getItem('docKey')
      : localStorage.getItem('accountKey')
  })

  const [data] = useCustomFetch(METHOD.GET, URL.doctorList, key)

  return (
    <Box className={classes.container}>
      {data?.doctorList ? (
        <Navigation doctorList={data.doctorList[0]} />) :
        <Navigation />
      }
      {data?.doctorList ? (
        pathName === 'doctors' ? (
          <Doctors doctorList={data.doctorList} />
        ) : (
          <Appointments doctorList={data.doctorList} />
        )
      ) : null}
    </Box>
  )
}

export default MyDoctors
