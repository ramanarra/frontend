import React from 'react'
import classNames from 'classnames'
import { Box, Typography, TextField } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import Centralize from '../../components/Centralize'
import Stretch from '../../components/Stretch'
import useNavigationStyles from './useStyle'
import View from '../../assets/img/icons/view.svg'
import Filter from '../../assets/img/icons/filter.svg'
import DotMenu from '../../assets/img/icons/dot-menu.svg'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Navigation = ({doctorList}) => {
  const classes = useNavigationStyles()

  const history = useHistory()

//   const [selectTab, setSelectedTab] = useState('doctors')

  const location = useLocation()

  const path = location.pathname.split('/')

  const pathName = path[1]

  function handleAppointmentOnClick() {
    const {doctorKey} = doctorList;
    // const doctorKey = 'Doc_5'
    history.push(`/appointments/${doctorKey}`);
  }

  function handleDoctorOnClick() {
      history.push('/doctors');
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.right} display="flex">
        <Box
          className={classNames(classes.button, {
            [classes.selecedTab]: (pathName === 'doctors'),
          })}
          onClick={handleDoctorOnClick}
        >
          <i
            style={{ color: (pathName === 'doctors') ? '#0bb5ff' : '#c7c7c7' }}
            className="icon-doctor"
          ></i>
          <Typography className={classes.content}>My Doctors</Typography>
        </Box>
        <Box
          className={classNames(classes.button, {
            [classes.selecedTab]: (pathName === 'appointments'),
          })}
          onClick={() => handleAppointmentOnClick()}
        >
          <i
            style={{ color: (pathName === 'appointments') ? '#0bb5ff' : '#c7c7c7' }}
            className={classNames('icon-calendar', classes.apponitments)}
          ></i>
          <Typography className={classes.content}>Appointments</Typography>
        </Box>
      </Box>
      <Stretch />
      {pathName === "doctors" ?
      (<Centralize>
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
      </Centralize>) :
        (<Centralize>
        <Box marginBottom={2.5} paddingRight={2}>
          <TextField
            InputProps={{ endAdornment: <SearchIcon /> }}
            label="Search Doctors"
            className={classes.textField}
          />
        </Box>
        </Centralize>)
      }
    </Box>
  )
}

export default Navigation
