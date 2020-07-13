import React from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import classnames from 'classnames'
import { Box, Typography } from '@material-ui/core'
import makeStyles from '@material-ui/styles/makeStyles'

import routes from './routes'

const useStyles = makeStyles({
  root: {
    width: 257,
    borderRight: '1px solid #d8d8d8',
  },

  container: {
    padding: '25px 30px',
  },

  typography: {
    fontSize: 13.1,
    paddingBottom: 30,
    color: '#6a6a6a',
    fontWeight: 'normal',
  },

  link: {
    textDecoration: 'none',
  },

  selectedColor: {
    color: '#54cbff',
  },
})

function SideBar() {
  const classes = useStyles()
  const { id } = useParams()

  const location = useLocation()

  const path = location.pathname.split('/')

  const pathName = path.length === 4 ? path[3] : ''

  const routesPath = routes.filter((route) => route.name === pathName)[0]

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Link className={classes.link} to={`/doctors/${id}/personal-setting`}>
          <Typography
            className={classnames(classes.typography, {
              [classes.selectedColor]: routesPath?.name === 'personal-setting',
            })}
          >
            Doctor Personal Setting
          </Typography>
        </Link>
        <Link className={classes.link} to={`/doctors/${id}/cancellation-reshedule`}>
          <Typography
            className={classnames(classes.typography, {
              [classes.selectedColor]: routesPath?.name === 'cancellation-reshedule',
            })}
          >
            Cancellation/Reschedule Options
          </Typography>
        </Link>
        <Link className={classes.link} to={`/doctors/${id}/questionnaire`}>
          {' '}
          <Typography
            className={classnames(classes.typography, {
              [classes.selectedColor]: routesPath?.name === 'questionnaire',
            })}
          >
            Questionnaire For Patients
          </Typography>
        </Link>
        <Link className={classes.link} to={`/doctors/${id}/work-schedules`}>
          <Typography
            className={classnames(classes.typography, {
              [classes.selectedColor]: routesPath?.name === 'work-schedules',
            })}
          >
            Work Schedules
          </Typography>
        </Link>
      </Box>
    </Box>
  )
}

export default SideBar
