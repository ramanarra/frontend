import React from 'react'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// import { METHOD, URL } from '../../../api'
// import useCustomFetch from '../../../hooks/useCustomFetch'
import InfoCard from './InfoCard'

const useStyles = makeStyles(() => ({
  // container: {
  //   width: '100%',
  //   padding: '22px 25px 30px 16px',
  //   height: '100%',
  //   background: '#f9f9f9',
  //   overflowY: 'auto',
  // },
}))

function Doctors({ doctorList }) {
  const classes = useStyles()

  return (
    <Box className={classes.container}>
      <Box display="flex" flexWrap="wrap">
        {doctorList.map((details, index) => {
          return <InfoCard key={index} doctorDetails={details} />
        })}
      </Box>
    </Box>
  )
}

export default Doctors
