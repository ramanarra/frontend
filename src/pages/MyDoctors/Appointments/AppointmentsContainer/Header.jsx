import React, {useState} from 'react'
import { Box, Typography, FormControl, NativeSelect} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import EventIcon from '@material-ui/icons/Event';

import Stretch from '../../../../components/Stretch'
import View from '../../../../assets/img/icons/view.svg'
import Filter from '../../../../assets/img/icons/filter.svg'
import DotMenu from '../../../../assets/img/icons/dot-menu.svg'
import Moment from 'moment'
import useStyle from './useStyleForHeader'


function Header({forwardPagination, backwardPagination, slots}) {
  const classes = useStyle()

  const current_day = Moment()

  const [date, setDate] = useState(Moment())

  const current_date = Moment.utc(date)

  const startDay = current_date.format('DD MMM, YYYY')

  const endDay = Moment.utc(slots[6].day).format('DD MMM, YYYY')

  const month = current_date.format('MMMM, YYYY')

  function handleOnNext() {
    const newDate = Moment(date.add('7', 'days'))
    setDate(newDate)
    forwardPagination()
  }

  function handleOnBack() {
    if(date.diff(current_day, 'days') > 0) {
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
            <ArrowBackIosIcon className={classes.arrowBackward} onClick={() => handleOnBack()} />
            <ArrowForwardIosIcon className={classes.arrowForward} onClick={() => handleOnNext()} />
        </Box>
          <Stretch />
          <Box display="flex" className={classes.right}>
              <Box className={classes.freeSlot}></Box>
              <Typography className={classes.txt}>Free Slot</Typography>
              <Box className={classes.booked}></Box>
              <Typography className={classes.txt}>Booked</Typography>
              <Box className={classes.blocked}></Box>
              <Typography className={classes.txt}>Blocked(Yet to Pay)</Typography>
            <Box paddingRight={2} paddingLeft={3} marginTop={-0.1}>
              <FormControl variant="outlined">
                <NativeSelect className={classes.select}>
                  <option selected>Week</option>
                </NativeSelect>
              </FormControl>
            </Box>
            <Box marginBottom={2.5} paddingRight={2.5}>
              <SearchIcon className={classes.search} />
            </Box>
            <Box paddingRight={3} marginBottom={1}>
              <img className={classes.imgSize} src={View} alt="View" />
            </Box>
            <Box paddingRight={3}>
              <img className={classes.imgSize} src={Filter} alt="Filter" />
            </Box>
            <Box paddingRight={2}>
              <img style={{ width: 3 }} src={DotMenu} alt="Menu" />
            </Box>
          </Box>
        </Box>
  )
}

export default Header
