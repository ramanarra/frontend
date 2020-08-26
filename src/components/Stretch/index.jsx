import React from 'react'
import makeStyles from '@material-ui/styles/makeStyles'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
})

export default function Stretch() {
  const classes = useStyles()
  return <div className={classes.root} />
}
