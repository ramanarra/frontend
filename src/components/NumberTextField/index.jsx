import React from 'react'
import { TextField, Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  textField: {
    '& input': {
      backgroundColor: '#f7f7f7',
      padding: '8px 4px',
      width: 22,
      textAlign: 'center',
      fontSize: 13,
      color: '#000000'  
    },
    '& fieldset': {
      border: 'none',
    },
  },
  text: {
    color: '#000000',
    fontSize: 12,
    paddingLeft: 8.5,
  },
}))

function NumberTextField({ label, ...rest }) {
  const classes = useStyles()

  return (
    <Box display="flex" alignItems="center" paddingLeft={1}>
      <TextField
        className={classes.textField}
        variant="outlined"
        size="small"
        inputProps={{ maxLength: 2 }}
        {...rest}
      />
      <Typography className={classes.text}>{label}</Typography>
    </Box>
  )
}

export default NumberTextField
