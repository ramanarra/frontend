import React from 'react'
import { Box } from '@material-ui/core'

import InfoCard from './InfoCard'

function Doctors({ doctorList }) {


  return (
    <Box>
      <Box display="flex" flexWrap="wrap">
        {doctorList.map((details, index) => {
          return <InfoCard key={index} doctorDetails={details} />
        })}
      </Box>
    </Box>
  )
}

export default Doctors
