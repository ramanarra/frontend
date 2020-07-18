import React, { useMemo } from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'

import { METHOD, URL } from '../../api'
import useCustomFetch from '../../hooks/useCustomFetch'
import InfoCard from './InfoCard'
import Navigation from './Navigation'
import Add from '../../assets/img/add.svg'

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    padding: '22px 25px 30px 16px',
    height: '100%',
    background: '#f9f9f9',
    overflowY: 'auto',
  },
  addBoxContainer: {
    width: 325,
    height: 215,
    position: "relative",
  },
  addIconContainer: {
    position: "absolute",
    right: 120,
    top: 85,
  },
  addBox: {
    width: 355,
    height: 305,
    position: "absolute",
    top: -35,
    left: -15,
  },
  text: {
    fontSize: 11,
    color: "#a8a8a8",
  },
  addIcon: {
    fontSize: 40,
    marginLeft: 20,
    color: "#a8a8a8",
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
          {data &&
            data.doctorList &&
            data.doctorList.map((details, index) => {
              return <InfoCard key={index} doctorDetails={details} />
            })}
          <Box className={classes.addBoxContainer}>
            <img src={Add} className={classes.addBox} />
              <Box className={classes.addIconContainer}>
                <AddIcon className={classes.addIcon} />
                <Typography className={classes.text}>Add New Doctor</Typography>
              </Box>
          </Box>
        </Box>
    </Box>
  )
}

export default Doctors
