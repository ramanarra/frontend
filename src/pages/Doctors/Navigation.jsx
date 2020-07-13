import React, { useState } from 'react'
import classNames from 'classnames'
import { Box, Typography, TextField } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import Centralize from '../../components/Centralize'
import Stretch from '../../components/Stretch'
import useNavigationStyles from './useStyle'
import View from '../../assets/img/icons/view.svg'
import Filter from '../../assets/img/icons/filter.svg'
import DotMenu from '../../assets/img/icons/dot-menu.svg'

const Navigation = () => {
  const classes = useNavigationStyles()

  const [selectTab, setSelectedTab] = useState('doctors')

  const isDoctorSelected = selectTab === 'doctors'

  const isApponitmentsSelected = selectTab === 'appointments'

  return (
    <Box className={classes.container}>
      <Box className={classes.right} display="flex">
        <Box
          className={classNames(classes.button, {
            [classes.selecedTab]: isDoctorSelected,
          })}
          onClick={() => setSelectedTab('doctors')}
        >
          <i
            style={{ color: isDoctorSelected ? '#0bb5ff' : '#c7c7c7' }}
            className="icon-doctor"
          ></i>
          <Typography className={classes.content}>My Doctors</Typography>
        </Box>
        <Box
          className={classNames(classes.button, {
            [classes.selecedTab]: isApponitmentsSelected,
          })}
          onClick={() => setSelectedTab('appointments')}
        >
          <i
            style={{ color: isApponitmentsSelected ? '#0bb5ff' : '#c7c7c7' }}
            className={classNames('icon-calendar', classes.apponitments)}
          ></i>
          <Typography className={classes.content}>Appointments</Typography>
        </Box>
      </Box>
      <Stretch />
      <Centralize>
        <Box marginBottom={2.5} paddingRight={2}>
          <TextField
            InputProps={{ endAdornment: <SearchIcon /> }}
            label="Search Doctors"
            className={classes.textField}
          />
        </Box>
        <Box paddingRight={2}>
          <img className={classes.imgSize} src={View} alt="View" />
        </Box>
        <Box paddingRight={2}>
          <img className={classes.imgSize} src={Filter} alt="Filter" />
        </Box>
        <Box paddingRight={2}>
          <img style={{ width: 3 }} src={DotMenu} alt="Menu" />
        </Box>
      </Centralize>
    </Box>
  )
}

export default Navigation
