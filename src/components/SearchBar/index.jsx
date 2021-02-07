import React from 'react'
import useStyles from './useStyles'
import { Box, TextField } from '@material-ui/core'
import { Search } from '@material-ui/icons'

const SearchBar = ({ label, placeholder, value, onChange, ...rest }) => {
  const classes = useStyles()
  return (
    <Box marginBottom={2.5} paddingRight={2}>
      <TextField
        InputProps={{ endAdornment: <Search /> }}
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={classes.textField}
        {...rest}
      />
    </Box>
  )
}

export default SearchBar
