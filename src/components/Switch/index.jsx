import React from 'react'
import { Switch as MatSwitch, withStyles } from '@material-ui/core'

const Switch = withStyles((theme) => ({
  root: {
    width: 50,
    height: 25,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    top: 1.5,
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(27px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 18,
    height: 18,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 25 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(MatSwitch)

export default Switch
