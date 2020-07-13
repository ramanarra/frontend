import React, { useMemo } from 'react'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { METHOD, URL } from '../../api'
import useCustomFetch from '../../hooks/useCustomFetch'
import InfoCard from './InfoCard'
import Navigation from './Navigation'

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    padding: '22px 25px 30px 16px',
    height: '100%',
    background: '#f9f9f9',
    overflowY: 'auto',
  },
}))

function Doctors() {
  const classes = useStyles()

  const key = useMemo(() => {
    return localStorage.getItem('role') === 'DOCTOR'
      ? localStorage.getItem('docKey')
      : localStorage.getItem('accountKey')
  })

  const [data] = useCustomFetch(METHOD.GET, `${URL.doctorList}${key}`)

  return (
    <Box className={classes.container}>
      <Navigation />
      <Box display="flex" flexWrap="wrap">
        {data && data.doctorList &&
          data.doctorList.map((details, index) => {
            return <InfoCard key={index} doctorDetails={details} />
          })}
      </Box>
    </Box>
  )
}

export default Doctors
