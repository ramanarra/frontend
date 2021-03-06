import React, { Fragment } from 'react'
import { Box } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import AppHeader from './AppHeader'
import AppBody from './AppBody'
import SideBar from './SideBar'

const useStyles = makeStyles(() => ({
  container: {
    height: '100vh',
    width: '100vw',
  },

  navBar: {
    height: 'calc(100% - 65px)',
    width: 'inherit',
    display: 'flex',
  },
}))

function Layout() {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      {localStorage.getItem('virujhToken') ? (
        <Fragment>
          <AppHeader />

          <Box className={classes.navBar}>
            <SideBar />
            <AppBody />
          </Box>
        </Fragment>
      ) : (
        <Redirect to={'/login'} />
      )}
    </div>
  )
}

export default Layout
