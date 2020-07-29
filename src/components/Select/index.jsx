import React from 'react'
import { MenuItem, Select, makeStyles } from '@material-ui/core'

const useStyle = makeStyles(() => ({
  root: {
    border: '1px solid #f0f0f0',
    fontSize: 10,
    color: '#777777',
    '& div': {
      paddingLeft: 10,
    },
  },

  option: {
    fontSize: 10,
    color: '#777777',
  },
}))

function CustomSelect({ value, onChange, options }) {
  const classes = useStyle()
  const renderMenuItems = (selectedOption, index) => (
    <MenuItem key={index} dense value={selectedOption.value}>
      <span className={classes.option}>{selectedOption.label}</span>
    </MenuItem>
  )

  return (
    <Select
      className={classes.root}
      disableUnderline
      onChange={onChange}
      value={value}
    >
      {options.map(renderMenuItems)}
    </Select>
  )
}

export default CustomSelect
