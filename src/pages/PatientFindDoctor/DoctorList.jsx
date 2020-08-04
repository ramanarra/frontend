import React from 'react'
import { Box, makeStyles } from '@material-ui/core'

import DoctorInfoCard from './DoctorInfoCard'

const useStyle = makeStyles(() => ({
  container: {
    width: '110%',
    display: 'flex',
    flexWrap: 'wrap',
  },
}))

function DoctorList({ doctorLists }) {
  const classes = useStyle()

  return (
    <Box className={classes.container}>
      {doctorLists &&
        doctorLists.map((doctorDetail, index) => {
          return <DoctorInfoCard doctorDetail={doctorDetail} key={index} />
        })}
    </Box>
  )
}

export default DoctorList
