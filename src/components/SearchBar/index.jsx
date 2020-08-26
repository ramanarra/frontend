import React from 'react'
import useStyles from './useStyles'
import { Box, TextField } from '@material-ui/core'
import { Search } from '@material-ui/icons'

const SearchBar = ({ label, placeholder }) => {
  const classes = useStyles()
  return (
    <Box marginBottom={2.5} paddingRight={2}>
      <TextField
        InputProps={{ endAdornment: <Search /> }}
        label={label}
        placeholder={placeholder}
        className={classes.textField}
      />
    </Box>
  )
}

export default SearchBar
