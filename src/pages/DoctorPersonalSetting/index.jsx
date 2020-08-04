import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { URL, METHOD } from '../../api'
import Static from './StaticField'
import ConsulationAndSignature from './ConsulationAndSignature'
import Preconsultancy from './PreConsult'
import useCustomFecth from '../../hooks/useCustomFetch'
import useDoctorConfigUpdate from '../../hooks/useDoctorConfigUpdate'
import useDocSettingWrite from '../../hooks/useDocSettingWrite'

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

  const isAbleToWrite = useDocSettingWrite()

  const key = useMemo(() => {
    return {
      doctorKey: id,
    }
  }, [id])
  const [data, refetch] = useCustomFecth(METHOD.GET, URL.doctorSettingsPersonalView, key)

  const [onSave] = useDoctorConfigUpdate(refetch)
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
            isAbleToWrite={isAbleToWrite}
          />
          <Preconsultancy
            refetch={refetch}
            docKey={id}
            configDetails={data?.configDetails}
            onSave={onSave}
            isAbleToWrite={isAbleToWrite}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default DoctorPersonalSetting
