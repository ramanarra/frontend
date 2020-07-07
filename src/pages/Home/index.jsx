import React from 'react'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Logo from '../../assets/img/logo.png'

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    width: '100vw',
  },

  appBar: {
    paddingLeft: 15,
    paddingRight: 40,
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #dddddd'
  },

  logoImg: {
    height: 75,
  },
}))

export default function ButtonAppBar() {
  const classes = useStyles()

  return (
   <div>udhaya</div>
  )
}
