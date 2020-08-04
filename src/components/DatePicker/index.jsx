import React from 'react'
import { Typography } from '@material-ui/core'
import MomentUtils from '@date-io/moment'
import { GoCalendar } from 'react-icons/go'
import { MuiPickersUtilsProvider, DatePicker as Picker } from '@material-ui/pickers'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles(() => ({
  dateText: {
    paddingBottom: 10,
  },
  datefield: {
    '& MuiOutlinedInput-adornedEnd': {
      svg: {
        color: '#dddddd',
      },
    },
  },
}))

export default function DatePicker({name, dateChange, value, width, fontSize, disablePast}) {
  const classes = useStyle()
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Typography variant="h5" className={classes.dateText} style={{fontSize: fontSize}}>{name}</Typography>
      
      <Picker
        className={classes.datefield}
        style={{width: width}}
        inputVariant="outlined"
        size="small"
        format="DD/MM/YYYY"
        placeholder="07/03/1985"
        value={value}
        onChange={dateChange}
        disablePast = {disablePast}
        InputProps={{
          endAdornment: <GoCalendar />,
        }}
      />
    </MuiPickersUtilsProvider>

  )
}
