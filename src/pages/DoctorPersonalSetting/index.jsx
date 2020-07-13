import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { URL } from '../../api'
import Static from './StaticField'
import ConsulationAndSignature from './ConsulationAndSignature'
import Preconsultancy from './PreConsult'
import useCustomFecth from '../../hooks/useCustomFetch'
import useDoctorConfigUpdate from '../../hooks/useDoctorConfigUpdate'
import { useCallback } from 'react'

const useStyle = makeStyles((theme) => ({
  container: {
    width: 'calc(100% - 257px)',
    paddingTop: 20,
    paddingLeft: 30,
    height: 'calc(100% - 20px)',
    overflow: 'auto',
  },

  leftSide: {
    paddingLeft: 28,
  },

  photo: {
    marginTop: 40,
    marginLeft: 10,
    width: theme.spacing(18),
    height: theme.spacing(18),
    border: '5px solid #9DE1FF',
  },

  text: {
    color: '#444444',
  },

  rightSide: {
    paddingTop: 40,
    paddingLeft: 75,
    width: '100%',
  },
}))

function DoctorPersonalSetting() {
  const classes = useStyle()
  const { id } = useParams()

  const key = useMemo(() => {
    return {
      doctorKey: id,
    }
  })
  const [data, refetch] = useCustomFecth('POST', URL.doctorSettingsPersonalView, key)

  const hanleOnRefetch = useCallback(() => refetch)
  const [onSave] = useDoctorConfigUpdate(hanleOnRefetch)
  return (
    <Box className={classes.container}>
      <Box display="flex">
        <Box className={classes.leftSide}>
          <Typography className={classes.text}>Doctors Details</Typography>
          {data?.doctorDetails && (
            <Avatar src={data.doctorDetails.photo} className={classes.photo} />
          )}
        </Box>
        <Box className={classes.rightSide}>
          <Static doctorDetails={data?.doctorDetails} />
          <ConsulationAndSignature
            docKey={id}
            configDetails={data?.configDetails}
            doctorDetails={data?.doctorDetails}
            onSave={onSave}
          />
          <Preconsultancy
            refetch={refetch}
            docKey={id}
            configDetails={data?.configDetails}
            onSave={onSave}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default DoctorPersonalSetting
