import React from 'react'
import classNames from 'classnames'
import { useHistory, useLocation } from 'react-router-dom'
import { Box, Typography, makeStyles } from '@material-ui/core'

const useStyle = makeStyles(() => ({
  container: {
    width: '97.65%',
    background: '#f9f9f9',
    backgroundColor: 'white',
    height: 90,
    padding: '0px 14px',
    boxShadow: '5px 0px 15px 0px #f3eeee',
  },

  heading: {
    paddingTop: 17,
    fontSize: 18,
    color: '#817d7d',
  },

  right: {
    alignItems: 'flex-end',
    paddingTop: 23,
  },

  content: {
    fontSize: 13.6,
    color: '#c7c7c7',
    fontWeight: 'normal',
  },

  imgSize: {
    width: 17,
  },

  upcomingButton: {
    cursor: 'pointer',
    display: 'flex',
    paddingBottom: 5,
  },

  pastButton: {
    marginLeft: 33,
    paddingBottom: 5,
    cursor: 'pointer',
  },

  selecedTab: {
    borderBottom: '2px solid #0bb5ff',
    '& p': {
      color: '#0bb5ff',
    },
  },
}))

const Header = () => {
  const classes = useStyle()

  const history = useHistory()

  const location = useLocation()

  const path = location.pathname.split('/')

  const pathName = path[3]

  function handlePastClick() {
    history.push(`/patient/appointments/past`)
  }

  function handleUpcomingClick() {
    history.push('/patient/appointments/upcoming')
  }

  return (
    <Box className={classes.container}>
      <Typography className={classes.heading}>Scheduled Appointments</Typography>
      <Box className={classes.right} display="flex">
        <Box
          className={classNames(classes.upcomingButton, {
            [classes.selecedTab]: pathName === 'upcoming',
          })}
          onClick={handleUpcomingClick}
        >
          <Typography className={classes.content}>Upcoming</Typography>
        </Box>
        <Box
          className={classNames(classes.pastButton, {
            [classes.selecedTab]: pathName === 'past',
          })}
          onClick={handlePastClick}
        >
          <Typography className={classes.content}>Past</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Header
