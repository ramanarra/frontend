import React, { useState } from 'react'
import Moment from 'moment'
import { Box, Typography, FormControl, NativeSelect } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import EventIcon from '@material-ui/icons/Event'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

import Stretch from '../../../../components/Stretch'
import View from '../../../../assets/img/icons/view.svg'
import Filter from '../../../../assets/img/icons/filter.svg'
import useStyle from './useHeaderStyle'
import Select from '../../../../components/Select'

const currentDay = Moment()

const options = [{ value: 'week', label: 'Week' }]

function Header({ forwardPagination, backwardPagination, slots, paginationNumber }) {
  const classes = useStyle()

  const [date, setDate] = useState(currentDay)

  const currentDate = Moment.utc(date)

  const startDay =
    paginationNumber === 0
      ? currentDate.format('DD MMM, YYYY')
      : Moment.utc(slots[0].day).format('DD MMM, YYYY')

  const endDay = Moment.utc(slots[6].day).format('DD MMM, YYYY')

  const month = currentDate.format('MMMM, YYYY')

  function handleOnNext() {
    const newDate = Moment(date.add('7', 'days'))
    setDate(newDate)
    forwardPagination()
  }

  function handleOnBack() {
    if (date.diff(currentDay, 'days') >= 0) {
      const newDate = Moment(date.subtract('7', 'days'))
      setDate(newDate)
      backwardPagination()
    }
  }

  return (
    <Box className={classes.container} display="flex">
      <Box className={classes.left} display="flex">
        <Typography className={classes.text}>{month.toUpperCase()}</Typography>
        <Box className={classes.date} display="flex">
          <Typography>{startDay.concat(' -' + endDay)}</Typography>
          <EventIcon className={classes.eventIcon} />
        </Box>
        <ArrowBackIosIcon
          className={classes.arrowBackward}
          onClick={() => handleOnBack()}
        />
        <ArrowForwardIosIcon
          className={classes.arrowForward}
          onClick={() => handleOnNext()}
        />
      </Box>
      <Stretch />
      <Box display="flex">
        <FiberManualRecordIcon className={classes.freeSlot} />
        <Typography className={classes.txt}>Free Slot</Typography>
        <FiberManualRecordIcon className={classes.booked} />
        <Typography className={classes.txt}>Booked</Typography>
        <FiberManualRecordIcon className={classes.blocked} />
        <Typography className={classes.txt}>Blocked(Yet to Pay)</Typography>
        <Box className={classes.selectBox}>
          <Select value={options[0].value} options={options} />
        </Box>
      </Box>
    </Box>
  )
}

export default Header
