import React from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core'

import { METHOD, URL } from '../../api'
import useManualFetch from '../../hooks/useManualFetch'
import DoctorInfoCard from './DoctorInfoCard'
import DoctorList from './DoctorList'

const useStyle = makeStyles(() => ({
  container: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    overflowY: 'auto',
  },
}))

function DoctorListWithHospital({ doctorAndHospitalList }) {
  const classes = useStyle()

  const doctorList = doctorAndHospitalList?.doctors || []

  const hospitalList = doctorAndHospitalList?.hospitals || []

  const [updateData, updateError, isUpdating, data] = useManualFetch()

  const doctorListInHospital = (key) => {
    updateData(METHOD.GET, `${URL.listOfDoctorsInHospital}${'?accountKey='}${key}`)
  }

  return (
    <Box className={classes.container}>
      {data && <DoctorList doctorLists={data} />}
      {!data &&
        doctorList &&
        doctorList.map((doctorDetail, index) => {
          return <DoctorInfoCard doctorDetail={doctorDetail} key={index} />
        })}
      {!data &&
        hospitalList &&
        hospitalList.map((doctorDetail, index) => {
          return (
            <DoctorInfoCard
              doctorDetail={doctorDetail}
              key={index}
              doctorListInHospital={doctorListInHospital}
            />
          )
        })}
    </Box>
  )
}

export default DoctorListWithHospital
