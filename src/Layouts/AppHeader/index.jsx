import React from 'react'
import classNames from "classnames";
import { Box, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Stretch from '../../components/Stretch'
import Logo from '../../assets/img/logo.png'

const useStyles = makeStyles(() => ({
  appBar: {
    height: 65,
    paddingLeft: 20,
    paddingRight: 60,
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #dddddd',
  },

  videoButton: {
    fontSize: 10,
    borderRadius: 20,
    boxShadow: 'none',
    padding: '6px 10px',
  },

  videoText: {
    marginLeft: 5,
  },

  gap: {
    marginRight: 20,
  },

  notificationImg: {
    fontSize: 17,
    color: '#a8a8a8',
  },

  logoImg: {
    height: 78,
  },

  text: {
    fontSize: 13.5,
    color: '#686868',
  }
}))

export default function ButtonAppBar() {
  const classes = useStyles()

  return (
    <Box className={classes.appBar}>
      <img className={classes.logoImg} src={Logo} alt="logo" />
      <Stretch />
      <Box className={classes.gap}>
        <Button className={classes.videoButton} variant="contained" color="primary">
          <i className="icon-video "></i>
          <span className={classes.videoText}>VIDEO CONSULTATION</span>
        </Button>
      </Box>
      <Box className={classes.gap}>
        <i className={classNames("icon-notify", classes.notificationImg)}></i>
      </Box>
      <Box className={classes.gap}>
        <Typography className={classes.text}>Amrit Medicare Pvt. Ltd.</Typography>
      </Box>
      {/* <Box>
        <img src={Med} alt="hospital logo" />
      </Box> */}
    </Box>
  )
}
