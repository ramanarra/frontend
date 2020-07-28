import React from 'react'
import { Typography } from '@material-ui/core'
import MomentUtils from '@date-io/moment'
import { GoCalendar } from 'react-icons/go'
import { MuiPickersUtilsProvider, DatePicker as Picker } from '@material-ui/pickers'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles(() => ({
  dateText: {
    fontSize: 12,
    paddingBottom: 10,
  },
  datefield: {
    width: 236,
    '& MuiOutlinedInput-adornedEnd': {
      svg: {
        color: '#dddddd',
      },
    },
  },
}))

export default function DatePicker({name, dateChange, value}) {
  const classes = useStyle()
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Typography variant="h5" className={classes.dateText}>{name}</Typography>

      <Picker
        className={classes.datefield}
        inputVariant="outlined"
        size="small"
        format="DD/MM/YYYY"
        placeholder="07/03/1985"
        value={value}
        onChange={dateChange}
        disablePast
        disableToolbar
        InputProps={{
          endAdornment: <GoCalendar />,
        }}
      />
    </MuiPickersUtilsProvider>
  )
}
