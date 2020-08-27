import React from 'react'
import { Box, makeStyles } from '@material-ui/core'

import DoctorInfoCard from './DoctorInfoCard'

const useStyle = makeStyles(() => ({
  container: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    overflowY: 'auto',
  },
}))

function DoctorList({ doctorLists, isHospital }) {
  const classes = useStyle()

  return (
    <Box className={classes.container}>
      {doctorLists &&
        doctorLists.map((doctorDetail, index) => {
          return <DoctorInfoCard doctorDetail={doctorDetail} key={index} isHospital={isHospital} />
        })}
    </Box>
  )
}

export default DoctorList
