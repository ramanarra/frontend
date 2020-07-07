import React from 'react'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  container: {
    width: '5.2%',
    background: '#0bb5ff',
  },

  item: {
    color: '#f7f7f7',
    fontSize: 24,
    paddingTop: 8,
    paddingBottom: 16
  }
}))

function NavBar() {
  const classes = useStyles()

  return (
    <Box className={classes.container}>
     <Box paddingTop={2}>   
      <Box className={classes.item} display="flex" justifyContent="center">
        <i className="icon-doctor "></i>
      </Box>
      <Box className={classes.item} display="flex" justifyContent="center">
        <i className="icon-patient "></i>
      </Box>
      <Box className={classes.item} display="flex" justifyContent="center">
        <i className="icon-progress "></i>
      </Box>
      <Box className={classes.item} display="flex" justifyContent="center">
        <i className="icon-settings "></i>
      </Box>
      </Box>
    </Box>
  )
}

export default NavBar
