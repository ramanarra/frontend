import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Box } from '@material-ui/core'
import makeStyles from '@material-ui/styles/makeStyles'

import SideBar from './SideBar'
import routes from './routes'


const useStyles = makeStyles(() => ({
  root: {
    padding: 25,
    height: '100%',
  },

  container: {
    width: '100%',
    height: '100%',
    boxShadow: '10px 12px 30px 0px #f1eded',
  },
}))

const DocBody = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Box className={classes.container} display="flex">
        <SideBar />
        <Switch>
          {routes.map((route, index) => {
            const Component = route.component

            return (
              <Route path={route.path} exact={true} key={index}>
                <Component />
              </Route>
            )
          })}
        </Switch>
      </Box>
    </div>
  )
}

export default DocBody
