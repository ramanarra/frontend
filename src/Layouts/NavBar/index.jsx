import React from 'react'
import { Link } from 'react-router-dom'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  container: {
    width: '5.2%',
    background: '#0bb5ff',
  },

  item: {
    color: '#f7f7f7',
    fontSize: 22,
    paddingTop: 8,
    paddingBottom: 16,
    display: 'flex',
    justifyContent: 'center',
    textDecoration: 'none'
  },
}))

function NavBar() {
  const classes = useStyles()

  return (
    <Box className={classes.container}>
      <Box paddingTop={2}>
        <Link className={classes.item} to="/doctors">
          <i className="icon-doctor "></i>
        </Link>
        <Link className={classes.item} to="/patients">
          <i className="icon-patient "></i>
        </Link>
        <Link className={classes.item} to="/reports">
          {' '}
          <i className="icon-progress "></i>
        </Link>
        <Link className={classes.item} to="/settings">
          <i className="icon-settings "></i>
        </Link>
      </Box>
    </Box>
  )
}

export default NavBar
